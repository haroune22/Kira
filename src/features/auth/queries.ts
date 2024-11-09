"use server"

import { createSessionClient } from "@/lib/appwrite";

export const getCurrent = async() => {
    try {
        const { account } = await createSessionClient();
        return account.get();
    } catch (error) {
        console.error("Failed to get user session:", error);
        return null
    }
}