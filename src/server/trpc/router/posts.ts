import {publicProcedure, router} from "../trpc";

export const postRouter = router({
    getAllProjects: publicProcedure.query(({ ctx }) => {
        return ctx.prisma.posts.findMany({
            where: {
                type: {
                    equals: 'PROJECT',
                },
            },
            orderBy: {
                published: 'desc',
            },
            select: {
                id: true,
                title: true,
                subtitle: true,
                content: true,
                languages: true,
            },
        });
    }),
})
