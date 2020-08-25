import { Server } from "miragejs"

export function makeServer({ environment = "test" } = {}) {
  let server = new Server({
    environment,

    routes() {
      this.namespace = "api"

      this.get("/prequalified", (schema, request) => {
        console.log(request.queryParams)
        return {
            response: 'Response from auto/prequalified'
        }
      });

      this.post("/user", (schema, request) => {
        console.log(request.requestBody)
        return {
            response: 'Response from auto/user'
        }
      });
    },
  })

  return server
}