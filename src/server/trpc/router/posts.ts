import {publicProcedure, router} from "../trpc";

export const postRouter = router({
    getAll: publicProcedure.query(({ ctx }) => {
        return ctx.prisma.posts.findMany();
    }),
})
