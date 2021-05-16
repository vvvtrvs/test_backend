import {
    Auth,
    Get,
    Optional,
    Post,
    RouteList,
    Validate,
    ItemType,
    RouteRequest,
    toJSON,
    StringFormat,
    emailRegex,
} from "./utils";

import { signJwt, User, userDB } from "./auth";

import bcrypt from "bcrypt";

class Hello {
    @Validate
    @Optional
    msg!: string;
}

class LoginRequest {
    @Validate
    @StringFormat(emailRegex)
    email!: string;

    @Validate
    password!: string;
}

class GetUserRequest {
    @Validate
    userId!: string;
}

class CreatePostRequest {
    @Validate
    content!: string;
}

class PostRequest {
    @Validate
    postId!: string;
}

class ForumPost {
    postId!: string;

    // TODO: Task 3 Part 1:
    @Validate
    content!: string;

    @Validate
    author!: User;

    @Validate
    created!: Date;
    @Validate
    updated!: Date;
    // End of Task 3 Part 1
}

const posts: {
    [key: string]: ForumPost;
} = {};

export default class Routes extends RouteList {
    @Get
    async foo(req: RouteRequest) {
        return { msg: "bar" };
    }

    @Post
    async hello(req: RouteRequest, body: Hello) {
        if (body.msg === "world") {
            return { msg: "ok" };
        } else {
            return { msg: "error" };
        }
    }

    // Task 1 Part 2:

    @Post
    async register(req: RouteRequest, user: User) {
        if (user.email in userDB)
            throw new Error("This email has been registered");

        const pwdHash = bcrypt.hashSync(user.password, 10);
        const userPwdHashed = { ...user, password: pwdHash };
        userDB[user.email] = userPwdHashed;

        const accessToken = signJwt(user.email);
        return {
            accessToken,
        };
    }

    // End of Task 1 Part 2

    // Task 2:

    @Post
    async login(req: RouteRequest, request: LoginRequest) {
        const user = userDB[request.email];
        if (!user) throw new Error("This email is not registered");

        if (!bcrypt.compareSync(request.password, user.password))
            throw new Error("Incorrect password");

        const accessToken = signJwt(user.email);
        return {
            accessToken,
        };
    }

    // End of Task 2

    @Get
    @Auth
    async me(req: RouteRequest) {
        return toJSON(req.user, User, "private");
    }

    @Get("/users/:userId")
    async users(req: RouteRequest, params: GetUserRequest) {
        return toJSON(userDB[params.userId], User, "public");
    }

    // TODO: Task 3:

    // Task 3 Part 1: List All Posts
    @Get
    async posts(req: RouteRequest) {
        return Object.fromEntries(
            Object.entries(posts).map((entry) => {
                const id = entry[0];
                const post = entry[1];
                return [id, toJSON(post, ForumPost, "public")];
            })
        );
    }

    // Task 3 Part 2: Create a post associated with current user
    @Post("/posts")
    @Auth
    async createPost(req: RouteRequest, body: CreatePostRequest) {
        const now = new Date();
        const post: ForumPost = {
            postId: Object.entries(posts).length.toString(),
            content: body.content,
            author: req.user!,
            created: now,
            updated: now,
        };

        posts[post.postId] = post;
        return toJSON(post, ForumPost, "public");
    }

    // Task 3 Part 3: Update a post
    async patchPost(req: RouteRequest, body: ForumPost, params: PostRequest) {}

    // Delete a post
    async deletePost(req: RouteRequest, params: PostRequest) {}

    // End of Task 3
}
