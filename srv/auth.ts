import jsonwebtoken from "jsonwebtoken";
import { StringFormat, Validate, Internal, Private } from "./utils";

export const secret = "c2d26e94-7b5f-4d63-a821-695f4703c2a2";

export const userDB: {
    [email: string]: User;
} = {};

export class User {
    // Task 1 Part 1:

    // emailregex.com
    static emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    @Validate
    @StringFormat(User.emailRegex)
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

export function signJwt(sub: string) {
    // Task 1 Part 3:

    return null;

    // End of task 1 part 3
}

export function checkJwt(token: string): User {
    const payload: any = jsonwebtoken.verify(token, secret, {
        algorithms: ["HS256"],
    });

    if (!payload.sub) throw new Error("Invalid sub");
    return userDB[payload.sub];
}
