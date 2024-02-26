import fastify from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";

const PORT = 3333;

const app = fastify();

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

app.listen({ port: PORT }).then(() => {
    console.log(`server_status: running on http://localhost:${PORT}`);
});
