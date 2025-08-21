import { todoRouter } from "../routers/todo";
import { userRouter } from "../routers/user";
import { router } from "./trpc";
const appRouter = router({
  user: userRouter,
  todo: todoRouter,
});
// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;
