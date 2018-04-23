import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const PIPELINE_QUERY = gql`
  query($slug: ID!) {
    pipeline(slug: $slug) {
      id
      name
      builds(first:1) {
        edges {
          node {
            id
            state
            createdBy {
              ... on User {
                id
                email
                name
              }
            }
          }
        }
      }
    }
  }
`;

const pipeline = ({ slug, children }) => {
  return (
    <Query
      query={PIPELINE_QUERY}
      variables={{ slug }}
      pollInterval={30000}
    >
      { children }
    </Query>
  )
};

export default pipeline;
