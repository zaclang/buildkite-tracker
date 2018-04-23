import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import fetch from 'isomorphic-unfetch';
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig();

const AuthLink = (operation, next) => {
  // const token = localStorage.getItem('token');

  operation.setContext(context => ({
    ...context,
    headers: {
      ...context.headers,
      Authorization: `Bearer ${publicRuntimeConfig.BUILDKITE_TOKEN}`,
    },
  }));

  return next(operation);
};

const HTTPLink = new HttpLink({
  uri: 'https://graphql.buildkite.com/v1',
  credentials: 'same-origin',
  fetch
});

const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.map(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
          ),
        );
      if (networkError) console.log(`[Network error]: ${networkError}`);
    }),
    AuthLink,
    HTTPLink,
  ]),
  cache: new InMemoryCache(),
  shouldBatch: true,
});

export default client;
