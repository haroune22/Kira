import { Models } from "node-appwrite"

export type workspace = Models.Document & {
    name: string;
    imageUrl: string;
    inviteCode: string;
    userId: string;
}