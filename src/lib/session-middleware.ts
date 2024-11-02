/* eslint-disable @typescript-eslint/no-unused-vars */

import "server-only"

import {
    Account,
    Client,
    Databases,
    Models,
    Storage,
    type Account as AccountType,
    type Databases as DatabasesType,
    type Storage as StorageType,
    type Users as UsersType,
} from "node-appwrite"

import { getCookie } from "hono/cookie"
import { createMiddleware } from "hono/factory"

import { AUTH_COOKIE } from "@/features/auth/constants"


type AdditionalContext = {
    Variables: {
        account: AccountType,
        databases: DatabasesType,
        user: Models.User<Models.Preferences>,
        storage: StorageType,
    }
}

export const sessionMiddleware = createMiddleware<AdditionalContext>(
    async(c, next) => {
        const client = new Client()
            .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
            .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);

        const session = getCookie(c, AUTH_COOKIE);

        if (!session) {
            return c.json({ error: 'Unauthorized' }, 401);
        };


        client.setSession(session); // Attach session to the client
        
        const account = new Account(client) as AccountType
        const databases = new Databases(client)
        const storage = new Storage(client)
        
        const user = await account.get()
        
        try {
            const user = await account.get();
            c.set('account', account);
            c.set('databases', databases);
            c.set('user', user);
            c.set('storage', storage);
            await next();
        } catch (error) {
            console.error("Failed to authenticate user:", error);
            return c.json({ error: 'Unauthorized' }, 401);
        }
    }
)