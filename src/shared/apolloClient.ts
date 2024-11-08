import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: import.meta.env.VITE_GRAPHQL_URL, // Cambia esto a la URL de tu servidor GraphQL
  cache: new InMemoryCache(),
});
