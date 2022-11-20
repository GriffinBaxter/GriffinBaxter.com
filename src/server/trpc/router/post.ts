import {publicProcedure, router} from "../trpc";
import {z} from "zod";

export const postRouter = router({
    getAllProjects: publicProcedure.query(({ ctx }) => {
        return ctx.prisma.post.findMany({
            where: {
                type: {
                    equals: 'PROJECT',
                },
            },
            orderBy: {
                published: 'desc',
            },
            select: {
                slug: true,
                title: true,
                subtitle: true,
                languages: true,
            },
        });
    }),
    getSinglePost: publicProcedure.input(z.string().optional()).query(({ ctx, input }) => {
        return ctx.prisma.post.findFirst({
            where: {
                slug: {
                    equals: input,
                },
            },
            select: {
                slug: true,
                type: true,
                title: true,
                subtitle: true,
                content: true,
                languages: true,
            },
        });
    }),
})
