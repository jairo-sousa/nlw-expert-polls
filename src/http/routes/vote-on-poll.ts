import z from "zod";
import { prisma } from "../../lib/prisma";
import { FastifyInstance } from "fastify";
import { randomUUID } from "node:crypto";

export async function voteOnPoll(app: FastifyInstance) {
    app.post("/polls/:pollId/votes", async (request, reply) => {
        const voteOnPollBody = z.object({
            pollOptionId: z.string().uuid(),
        });

        const voteOnPollParams = z.object({
            pollId: z.string().uuid(),
        });

        const { pollOptionId } = voteOnPollBody.parse(request.params);
        const { pollId } = voteOnPollParams.parse(request.params);

        let { sessionId } = request.cookies;

        if (!sessionId) {
            sessionId = randomUUID();

            reply.setCookie("sessionId", sessionId, {
                path: "/",
                maxAge: 60 * 60 * 24 * 30, // 30 days
                signed: true,
                httpOnly: true,
            });
        }

        console.log(`route_served: get/polls/:${pollOptionId}/votes`);
        return reply.status(201).send({ sessionId });
    });
}
