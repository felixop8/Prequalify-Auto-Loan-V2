import { Server, Response } from "miragejs";
import { desqualifiedLoanData, qualifiedLoanData } from './data/mockServerResponses';

export function makeServer({ environment = "test" } = {}) {
  let server = new Server({
    environment,

    routes() {
      this.namespace = "api"

      this.get("/prequalified", (schema, request) => {
        const { price, credit, income } = request.queryParams;
        // Some business rules.
        // Since this is just a mock endpoint it doesn't include the appropiate backend validation.
        if(parseInt(price) > 1000000) return new Response(400, { some: 'header' }, { errors: [ 'Car Price above threshold ($1,000,000).'] });
        if( parseInt(price) > (parseInt(income) / 5) || parseInt(credit) < 600  ) return {data: desqualifiedLoanData};
        return {data: {...qualifiedLoanData, application_data: request.queryParams}};
      });

      this.post("/user", (schema, request) => {
        let attrs = JSON.parse(request.requestBody)
        return {data: {message: 'Account created successfully!', isLoggedIn: true, username: attrs.email}}
      });
    },
  })

  return server
}