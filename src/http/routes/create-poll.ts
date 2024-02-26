import z from "zod";
import { prisma } from "../../lib/prisma";
import { FastifyInstance } from "fastify";

export async function createPoll(app: FastifyInstance) {
    app.post("/polls", async (request, reply) => {
        const createPollBody = z.object({
            title: z.string(),
        });

        const { title } = createPollBody.parse(request.body);

        const poll = await prisma.polls.create({
            data: {
                title,
            },
        });
        console.log("route_served: post/polls");

        return reply.status(201).send({ pollId: poll.id });
    });
}
