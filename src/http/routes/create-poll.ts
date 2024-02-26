import z from "zod";
import { prisma } from "../../lib/prisma";
import { FastifyInstance } from "fastify";

export async function createPoll(app: FastifyInstance) {
    app.post("/poll", async (request, reply) => {
        const createPollBody = z.object({
            title: z.string(),
        });

        const { title } = createPollBody.parse(request.body);

        const poll = await prisma.poll.create({
            data: {
                title,
            },
        });
        console.log("route_served: post/poll");

        return reply.status(201).send({ pollId: poll.id });
    });
}
