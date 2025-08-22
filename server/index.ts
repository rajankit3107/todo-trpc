import { todoRouter } from "../routers/todo";
import { userRouter } from "../routers/user";
import { Todo, User } from "./db";
import { router } from "./trpc";
import { createHTTPServer } from "@trpc/server/adapters/standalone";
import jwt from "jsonwebtoken";

const SECRET = secr3t;

const appRouter = router({
  user: userRouter,
  todo: todoRouter,
});
// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;

const server = createHTTPServer({
  router: appRouter,
  createContext(opts) {
    let authHeader = opts.req.headers["authorization"];

    if (authHeader) {
      const token = authHeader.split(" ")[1];
      console.log(token);

      return new Promise<{
        db: { Todo: typeof Todo; User: typeof User };
        userId?: string;
      }>((resolve) => {
        jwt.verify(token, SECRET, (err, user) => {
          if (user) {
            resolve({ userId: user.userId as string, db: { Todo, User } });
          } else {
            resolve({ db: { Todo, User } });
          }
        });
      });
    }

    return {
      db: { Todo, User },
    };
  },
});
