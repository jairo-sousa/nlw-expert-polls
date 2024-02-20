import fastify from "fastify";

const PORT = 3333;

const app = fastify();

app.post("/polls", (request) => {
    console.log("served_route: /polls");
    return "/polls";
});

app.listen({ port: PORT }).then(() => {
    console.log(`server_status: running on http://localhost:${PORT}`);
});
