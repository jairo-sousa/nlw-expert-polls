import fastify from "fastify";
import { z } from "zod";

const PORT = 3333;

const app = fastify();

app.post("/polls", (request) => {
    const createPollBody = z.object({
        title: z.string(),
    });

    const { title } = createPollBody.parse(request.body);

    console.log("served_route: /polls");
    return `título digitado: ${title}`;
});

app.listen({ port: PORT }).then(() => {
    console.log(`server_status: running on http://localhost:${PORT}`);
});
