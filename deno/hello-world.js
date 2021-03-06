const listener = Deno.listen({ port: 8000 });
console.log("http://localhost:8000/");
for await (const conn of listener) {
  (async () => {
    const requests = Deno.serveHttp(conn);
    for await (const r of requests) {        
      r.respondWith(new Response("Hello world"));
    }
  })();
}