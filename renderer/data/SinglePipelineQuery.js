import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import get from 'lodash.get';

const QUERY = gql`
  query($slug: ID!) {
    pipeline(slug: $slug) {
      id
      name
      builds(first:1) {
        edges {
          node {
            state
          }
        }
      }
    }
  }
`;

const SinglePipelineQuery = props => props.children(props.data);

export default graphql(QUERY, {
  options: ({ slug }) => ({ variables: { slug } }),
    props: ({ data }) => {
    const pipeline = data.pipeline || {};
    const builds = get(pipeline, 'builds.edges', [])
    return {
      data: { pipeline, builds }
    };
  }
})(SinglePipelineQuery);
