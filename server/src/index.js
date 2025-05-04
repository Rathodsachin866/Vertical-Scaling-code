// import { Hono } from 'hono' 
// import { cors } from 'hono/cors';
// import { employes } from 'employes/index.js'

// const app = new Hono<{
//   Bindings: {
//     DATABASE-URL: string;
//   };
// }>();

// app.use(
//   "*",
//   cors({
//     origin:"*",
//     allowMethods:['GET', 'POST', 'PUT', 'DELETE'],
//   })
// );

// app.('/api/v1/heier' employes)

// export default app;
const cluster = require("cluster");
const  http = require("http");
const os = require("os");

const numCpus = os.cpus().length;

console.log(`Number of CPUs: ${numCpus}`);
if(cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);
  console.log(`Number of CPUs: ${numCpus}`);

  // Fork workers.
  for (let i = 0; i < numCpus; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
    cluster.fork();
  });
}
else {

  console.log(`Worker ${process.pid} started`);

  const server = http.createServer((req, res) => {
    res.writeHead(200);
    res.end("Hello World");
  });

  server.listen(3000, () => {
    console.log(`Server running at http://localhost:3000/`);
  });
}