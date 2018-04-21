import { ApolloProvider } from 'react-apollo';
import client from './client';

const withData = WrappedComponent => () => {
  return (
    <ApolloProvider client={client}>
      <WrappedComponent />
    </ApolloProvider>
  );
};

export default withData;
