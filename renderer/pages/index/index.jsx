import electron from 'electron';
import getConfig from 'next/config'
import { Spin } from 'antd';
import get from 'lodash.get';
import { Query } from 'react-apollo';

import withData from '../../lib/withData';
import Bubbles from './Bubbles';

import { ORGANIZATION_QUERY } from './Organization';

import './style.css';

const screenElectron = electron.screen.getPrimaryDisplay();
const { publicRuntimeConfig } = getConfig();

const app = () => (
  <Query
  query={ORGANIZATION_QUERY}
  variables={{ slug: publicRuntimeConfig.BUILDKITE_ORG_SLUG }}>
    {
      ({ loading, data: { organization } }) => {
        if (loading) {
          return <Spin size='large' />;
        }

        return (
          <Bubbles data={get(organization, 'pipelines.edges', [])} />
        );
      }
    }
  </Query>
);

export default withData(app);
