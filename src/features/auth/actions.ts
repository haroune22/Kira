"use server"

import { cookies } from "next/headers";
import { Account, Client } from "node-appwrite";
import { AUTH_COOKIE } from "./constants";

export const getCurrent = async() => {
    try {
        const client = new Client()
            .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
            .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);
        
        const session = cookies().get(AUTH_COOKIE)
        // console.log("client",client)

        if (!session || !session.value.length) {
            // console.error("Invalid JWT format:", session?.value);
            return null;
        }
        // console.log("session",session)
        client.setSession(session.value)
        
        return {
                get account() {
                    return new Account(client);
                },
        }
    } catch (error) {
        console.error("Failed to get user session:", error);
        return null
    }
}