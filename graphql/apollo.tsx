import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { createHttpLink } from 'apollo-link-http';

const GRAPHQL_URL = 'http://127.0.0.1/graphql';
const REQUEST_TIMEOUT_MS = 30000;

const consoleLogColor = (text: string, color: number) => {
  console.log('\u001b[' + color + 'm' + text + '\u001b[0m');
};

const stringifyFilter = (key: string, val: any) => {
  if (key !== '__typename') {
    return val;
  }
};

const debugMiddleware = new ApolloLink((operation, forward) => {
  const space = 2;

  return forward(operation).map(response => {
    const { operationName, variables } = operation;

    if (response.errors) {
      consoleLogColor(
        `\nGraphQL Operation: ${operationName}\nGraphQL Endpoint: ${GRAPHQL_URL}\nvariables:${JSON.stringify(variables)}\nresponse.data:${JSON.stringify(response, stringifyFilter, space)}\n`,
        31
      );
    } else {
      consoleLogColor(
        `\nGraphQL Operation: ${operationName}\nGraphQL Endpoint: ${GRAPHQL_URL}\nvariables:${JSON.stringify(variables)}\nresponse.data:${JSON.stringify(response.data, stringifyFilter, space)}\n`,
        36
      );
    }

    return response;
  });
});

const fetchWithTimeout = (uri: RequestInfo, options: RequestInit): Promise<Response> => {
  const fetchResult = fetch(uri, options);
  const promise = new Promise<Response>((resolve, reject) => {
    const timeout = setTimeout(() => {
      clearTimeout(timeout);
      reject('Timeout');
    }, REQUEST_TIMEOUT_MS);
  });

  return Promise.race([fetchResult, promise]);
};

const httpLink = createHttpLink({
  fetch: fetchWithTimeout,
  uri: GRAPHQL_URL,
});

let client: ApolloClient<NormalizedCacheObject>;
export function getClient() {
  if (!client) {
    client = initClient();
  }

  return client;
}
function initClient(): ApolloClient<NormalizedCacheObject> {
  const middlewares = [debugMiddleware, httpLink];

  return new ApolloClient<NormalizedCacheObject>({
    cache: new InMemoryCache(),
    link: ApolloLink.from(middlewares),
  });
}
