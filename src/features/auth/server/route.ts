import { Hono } from "hono"
import { zValidator } from "@hono/zod-validator"
import { loginSchema, registerSchema } from "../schemas";

const app = new Hono()
    .post(
        "/login", 
        zValidator('json', loginSchema),
    async (c) => {
        const { email, password } = c.req.valid("json");
        console.log({ email, password });
        return c.json({ success: 123});
    })
    .post(
        "/register",
        zValidator('json', registerSchema),
        async (c) => {
            const { email, password, name } = c.req.valid("json");
            console.log({ email, password, name });
            return c.json({ success: 123});
        }
    )

export default app