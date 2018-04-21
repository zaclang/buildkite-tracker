import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import get from 'lodash.get';

const QUERY = gql`
  query($slug: ID!) {
    organization(slug: $slug) {
      id
      pipelines(first:10) {
        edges {
          node {
            id
            name
            slug
          }
        }
      }
    }
  }
`;

const PipelinesQuery = props => props.children(props.data);

export default graphql(QUERY, {
  options: ({ slug }) => ({ variables: { slug } }),
  props: ({ data }) => {
    return {
      data: {
        pipelines: get(data, 'organization.pipelines.edges', [])
      }
    };
  }
})(PipelinesQuery);
