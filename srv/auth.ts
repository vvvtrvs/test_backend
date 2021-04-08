
import jsonwebtoken from 'jsonwebtoken'
import { StringFormat, Validate, Internal } from './utils';

export const secret = "c2d26e94-7b5f-4d63-a821-695f4703c2a2"

export const userDB : {
    [email : string] : User
} = {};

export class User {
    // TODO: Task 1 Part 1:
    @Validate
    @StringFormat(/.*/)
    email! : string

    @Validate
    @Internal
    password! : string

    // End of Task 1 Part 1
}

export function signJwt(sub : string) {
    // Task 1 Part 3:

    return null;

    // End of task 1 part 3
}

export function checkJwt(token : string) : User {
    const payload : any = jsonwebtoken.verify(token, secret, {
        algorithms: ["HS256"],
    });

    if(!payload.sub) throw new Error("Invalid sub")
    return userDB[payload.sub];
}
