import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const ORGANIZATION_QUERY = gql`
  query($slug: ID!) {
    organization(slug: $slug) {
      id
      pipelines(first:99) {
        edges {
          node {
              id
              name
              builds(first:3) {
                edges {
                  node {
                    id
                    url
                    state
                    createdBy {
                      ... on User {
                        id
                        email
                        name
                      }
                    }
                    createdAt
                    finishedAt
                  }
                }
              }
          }
        }
      }
    }
  }
`;

const Organization = ({ slug, children }) => {
  return (
    <Query
      query={ORGANIZATION_QUERY}
      variables={{ slug }}
    >
      { children }
    </Query>
  )
};

export default Organization;
