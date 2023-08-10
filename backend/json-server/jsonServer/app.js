const jsonServer = require("json-server")
const serverless = require("serverless-http")
const server = jsonServer.create()
const router = jsonServer.router("db.json")
const middlewares = jsonServer.defaults()
const port = 5001

server.use(middlewares)
server.use(router)

server.listen(port, ()=>{
    console.log(`Listening on PORT ${port}`)
})

module.exports.handler = serverless(server)
