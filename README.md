# test-backend

## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn serve
```

```
yarn express
```

### Documentations

-   [Vue](https://vuejs.org/v2/guide/)
-   [Typescript](https://www.typescriptlang.org/docs/handbook/)
-   [Express](http://expressjs.com/en/api.html)
-   [JWT](https://jwt.io/)

### Task List

You can use any IDE you prefer. We suggest VSCode or Gitpod.

-   Task 1: User Registration

    -   Part 1: Complete the `User` class in `srv/auth.ts`
        -   Add the missing fields and appropriate data validation
    -   Part 2: Complete the `register` api in `srv/routes.ts`
        -   Use `bcrypt` to hash the password
        -   Add the user to the `userDB`
    -   Part 3: Complete the `signJwt` function in `srv/auth.ts`
        -   Sign a jwt with the `sub`
    -   Requirements
        -   `password` is hashed and is not returned in any api
        -   `age` and `phone` are private and is not returned in the get user api

-   Task 2: User Authentication

    -   Complete the `login` api in `srv/routes.ts`

-   Task 3: Mini Forum
    -   Part 1: Complete the `ForumPost` class and `posts` api in `srv/routes.ts`
    -   Part 2: Complete the `createPost` api in `srv/routes.ts` and `createPost` api request in `src/components/Task3.vue`
    -   Part 3: Complete the `patchPost` api in `srv/routes.ts` and `patchPost` api request in `src/components/Task3.vue`
    -   Part 4: Complete the `deletePost` api in `srv/routes.ts` and `deletePost` api request in `src/components/Task3.vue`
    -   Requirements:
        -   All posts are public
        -   Only post owner can update or delete the post
        -   Posts have creation and update time
        -   Post author's name and public information is also returned in post list

After you completed the task, please commit and push to your Github and send us the repository url.
