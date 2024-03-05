import { prisma } from "../lib/prisma";
import fastify from "fastify";
import cookie from "@fastify/cookie";
import { z } from "zod";
import { createPoll } from "./routes/create-poll";
import { getPoll } from "./routes/get-poll";
import { voteOnPoll } from "./routes/vote-on-poll";

const PORT = 3333;

const app = fastify();

app.register(cookie, {
    secret: "polls-app-nlw",
    hook: "onRequest",
});

app.register(createPoll);
app.register(getPoll);
app.register(voteOnPoll);

app.listen({ port: PORT }).then(() => {
    console.log(`server_status: running on http://localhost:${PORT}`);
});
