import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const ORGANIZATION_QUERY = gql`
  query($slug: ID!) {
    organization(slug: $slug) {
      id
      pipelines(first:10) {
        edges {
          node {
            id
            slug
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
