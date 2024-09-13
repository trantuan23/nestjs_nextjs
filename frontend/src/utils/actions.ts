'use server'
import { signIn } from "@/auth";

export async function authenticate(username: string, password: string) {
    try {
        const r = await signIn("credentials", {
            username: username,
            password: password,
            redirect: false,
        })
        console.log(r);
        
        return r
    } catch (error) {
        if ((error as any).name === "InvalidEmailPasswordError") {
            console.log(error);
            
            return {
                error: (error as any).type,
                code: 1
            }
        } else if ((error as any).name === "InvalidAccountActive") {
            return {
                error: (error as any).type,
                code: 2
            }
        } else {
            return {
                error: "Internal server error",
                code: 3
            }
        }



    }
}