import { Server, Response } from "miragejs";
import { disqualifyResponseData, prequalifyResponseData } from './data/mockServerResponses';

// Mirage JS is an API mocking library that lets you build, 
// test and share a complete working JavaScript application without having to rely on any backend services.
// It runs in the browser. It intercepts any XMLHttpRequest or fetch requests your JavaScript app makes and lets you mock the response
export function makeServer({ environment = "test" } = {}) {
  let server = new Server({
    environment,

    routes() {
      this.namespace = "api"

      this.get("/prequalify", (schema, request) => {
        const { price, credit, income } = request.queryParams;
        // Some business rules.
        // Since this is just a mock endpoint it doesn't include the appropiate backend validation.
        // I could have moved this into its own util function, but since this is just a mock and
        // this calculations most likely occurs in the server I didn't want to spend too much time on it.
        if(parseInt(price) > 1000000) return new Response(400, { some: 'header' }, { error:'Car Price above threshold ($1,000,000).' });
        if( parseInt(price) > (parseInt(income) / 5) || parseInt(credit) < 600  ) return {...disqualifyResponseData}; 
        return {...prequalifyResponseData};
      });

      this.post("/register/user", (schema, request) => {
        return new Response(201, { some: 'header' }, { message: 'User registered successfully!', status: 1 });
      });
    },
  })

  return server
}
