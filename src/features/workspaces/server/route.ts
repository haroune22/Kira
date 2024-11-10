import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { createWorkspaceSchema, updateWorkspaceSchema } from "../schemas";
import { sessionMiddleware } from "@/lib/session-middleware";
import { DATABASE_ID, IMAGES_BUCKET_ID, MEMBERS_ID, WORKSPACES_ID } from "@/config";
import { ID, Query } from "node-appwrite";
import { MemberRole } from "@/features/members/tyeps";
import { generateInviteCode } from "@/lib/utils";
import { getMember } from "@/features/members/utils";

const app = new Hono()
    .get("/", sessionMiddleware, 
        async(c) => {
            const databases = c.get("databases")
            const user = c.get("user")

            const members = await databases.listDocuments(
                DATABASE_ID,
                MEMBERS_ID,
                [Query.equal("userId", user.$id)]
            )

            if(members.total === 0) {
                return c.json({ data: { documents: [], total: 0} });
            };

            const workspaceIds = members.documents.map(member => member.workspaceId);

            const workspaces = await databases.listDocuments(
                DATABASE_ID,
                WORKSPACES_ID,
                [
                    Query.orderDesc("$createdAt"),
                    Query.contains('$id', workspaceIds)
                ]
            );

            return c.json({ data: workspaces });
    })
    .post(
        '/',
        zValidator("form", createWorkspaceSchema),
        sessionMiddleware,
        async (c) => {
            const storage = c.get("storage")
            const databases = c.get("databases");
            const user = c.get("user")
            
            const { name, image } = c.req.valid("form");

            let uploadedImageUrl : string | undefined

            if(image instanceof File){
                const file = await storage.createFile(
                    IMAGES_BUCKET_ID,
                    ID.unique(),
                    image
                )

                const arrayBuffer = await storage.getFilePreview(
                    IMAGES_BUCKET_ID,
                    file.$id,
                )

                uploadedImageUrl = `data:image/png;base64,${Buffer.from(arrayBuffer).toString("base64")}`
            }

            const workspace = await databases.createDocument(
                DATABASE_ID,
                WORKSPACES_ID,
                ID.unique(),
                {
                    name,
                    userId: user.$id,
                    imageUrl: uploadedImageUrl,
                    inviteCode: generateInviteCode(10),
                }
            );

            await databases.createDocument(
                DATABASE_ID,
                MEMBERS_ID,
                ID.unique(),
                {
                    userId: user.$id,
                    workspaceId: workspace.$id,
                    role: MemberRole.ADMIN,
                }
            );

            return c.json({ data: workspace  })
        }
    )
    .patch(
        "/:workspaceId",
        sessionMiddleware,
        zValidator("form", updateWorkspaceSchema),
        async (c) => {
            const user = c.get("user");
            const databases = c.get("databases");
            const storage = c.get("storage")

            if(!user){
                return c.json({ error: "Unauthorized" }, 401);
            };

            const workspaceId = c.req.param("workspaceId");

            if(!workspaceId){
                return c.json({ error: " invalid workspace id" }, 401);
            };

            const { name , image } = c.req.valid("form");

            const member = await getMember({
                databases,
                workspaceId,
                userId: user.$id,
            })
            
            if(!member || member.role !== MemberRole.ADMIN){
                return c.json({ error: "Not allowed to update workspace"}, 402)
            }

            let uploadedImageUrl : string | undefined

            if(image instanceof File){
                try {
                    const file = await storage.createFile(
                        IMAGES_BUCKET_ID,
                        ID.unique(),
                        image
                    );
    
                    const arrayBuffer = await storage.getFilePreview(
                        IMAGES_BUCKET_ID,
                        file.$id
                    );
    
                    uploadedImageUrl = `data:image/png;base64,${Buffer.from(arrayBuffer).toString("base64")}`;
                } catch (error) {
                    console.error("Image upload failed:", error);
                    return c.json({ error: "Failed to upload image" }, 500);
                }
            } else{
                uploadedImageUrl = image
            }

            const updateWorkspace = await databases.updateDocument(
                DATABASE_ID,
                WORKSPACES_ID,
                workspaceId,
                {
                    name,
                    imageUrl: uploadedImageUrl,
                }
            )

            return c.json({ data: updateWorkspace });
        }
    )
    .delete(
        '/:workspaceId',
        sessionMiddleware,
        async(c) => {
            const user = c.get("user");
            const databases = c.get("databases");
            // const storage = c.get("storage")

            if(!user){
                return c.json({ error: "Unauthorized" }, 401);
            };

            const { workspaceId } = c.req.param();

            if(!workspaceId){
                return c.json({ error: " invalid workspace id" }, 401);
            };

            const member = await getMember({
                databases,
                workspaceId,
                userId: user.$id,
            })
            
            if(!member || member.role !== MemberRole.ADMIN){
                return c.json({ error: "Not allowed to update workspace"}, 402)
            }

            //todo: delete members and projects and tasks

            await databases.deleteDocument(
                DATABASE_ID, 
                WORKSPACES_ID,
                workspaceId
            );

            return c.json({data: { $id: workspaceId } })
        }
    )
    .post(
        '/:workspaceId/reset-invite-code',
        sessionMiddleware,
        async(c) => {
            const user = c.get("user");
            const databases = c.get("databases");
            // const storage = c.get("storage")

            if(!user){
                return c.json({ error: "Unauthorized" }, 401);
            };

            const { workspaceId } = c.req.param();

            if(!workspaceId){
                return c.json({ error: " invalid workspace id" }, 401);
            };

            const member = await getMember({
                databases,
                workspaceId,
                userId: user.$id,
            })
            
            if(!member || member.role !== MemberRole.ADMIN){
                return c.json({ error: "Not allowed to update workspace"}, 402)
            }

            //todo: delete members and projects and tasks

            const workspace = await databases.updateDocument(
                DATABASE_ID, 
                WORKSPACES_ID,
                workspaceId,
                {
                    inviteCode: generateInviteCode(10)
                }
            );

            return c.json({data: workspace })
        }
    )

export default app;