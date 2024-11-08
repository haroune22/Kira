import { DATABASE_ID, MEMBERS_ID } from "@/config"
import { Query , type Databases } from "node-appwrite"

interface GetMemberProps {
    userId: string,
    databases: Databases,
    workspaceId: string,
}

export const getMember = async({    
    databases,
    workspaceId,
    userId,
}:GetMemberProps) => {

    const members = await databases.listDocuments(
        DATABASE_ID,
        MEMBERS_ID,
        [
            Query.equal("userId", userId),
            Query.equal("workspaceId", workspaceId),
        ]
    )

    return members.documents[0]
}