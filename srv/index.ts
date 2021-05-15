import "reflect-metadata";
import express, { Router, Request, Response } from "express";
import { convertType, RouteListSymbol, RouteRequest } from "./utils";
// import socketIO from "socket.io";
import Routes from "./routes";
import { checkJwt } from "./auth";

export default (app: Router, http: any) => {
    app.use(express.json());

    const routes = new Routes();
    for (const [path, route] of Object.entries(routes[RouteListSymbol] || {})) {
        const wrappedRoute = async (req: Request, res: Response) => {
            try {
                const args: any[] = [];
                const mreq: RouteRequest = {};
                if (route.auth) {
                    const token = req.headers["authorization"];
                    if (!token || !token.startsWith("Bearer ")) {
                        throw new Error("Missing or invalid token");
                    }
                    const jwt = token.slice(7);
                    if (!jwt) {
                        throw new Error("Missing or invalid token");
                    }
                    mreq.user = checkJwt(jwt);
                }
                args.push(mreq);
                if (route.method === "POST" || route.method === "PATCH") {
                    args.push(req.body);
                }
                args.push(req.params);
                args.push(req.query);
                const params = Reflect.getMetadata(
                    "design:paramtypes",
                    routes,
                    route.name
                );
                if (params.length > args.length) {
                    throw new Error("Arguments not enough");
                }
                for (let i = 1; i < params.length; i++) {
                    args[i] = convertType(args[i], params[i]);
                }
                const resp = await (routes as any)[route.name].apply(
                    this,
                    args
                );
                res.status(200).json(resp);
            } catch (e) {
                res.status(500).json({
                    message: e.message,
                    stack: e.stack,
                });
            }
        };
        switch (route.method) {
            case "GET":
                app.get(route.path, wrappedRoute);
                break;
            case "POST":
                app.post(route.path, wrappedRoute);
                break;
            case "PATCH":
                app.patch(route.path, wrappedRoute);
                break;
            case "DELETE":
                app.delete(route.path, wrappedRoute);
                break;
        }
    }
};
