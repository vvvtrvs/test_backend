import jsonwebtoken from "jsonwebtoken";
import { StringFormat, Validate, Internal, Private, emailRegex } from "./utils";

export const secret = "c2d26e94-7b5f-4d63-a821-695f4703c2a2";

export const userDB: {
    [email: string]: User;
} = {};

export class User {
    // Task 1 Part 1:

    @Validate
    @StringFormat(emailRegex)
    email!: string;

    @Validate
    @Internal
    password!: string;

    @Validate
    username!: string;

    @Validate
    @Private
    phone!: string;

    @Validate
    @Private
    age!: number;
    // End of Task 1 Part 1
}

export function signJwt(sub: string): string {
    // Task 1 Part 3:
    const token = jsonwebtoken.sign(sub, secret, {
        algorithm: "HS256",
    });
    return token;

    // End of Task 1 part 3
}

export function checkJwt(token: string): User {
    const payload: any = jsonwebtoken.verify(token, secret, {
        algorithms: ["HS256"],
    });

    if (!payload.sub) throw new Error("Invalid sub");
    return userDB[payload.sub];
}
