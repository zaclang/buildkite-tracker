import electron from 'electron';
import getConfig from 'next/config'
import { Spin } from 'antd';
import get from 'lodash.get';

import Organization from '../data/Organization';
import withData from '../lib/withData';
import PipelinesList from '../components/PipelinesList';

import './style.css';

const screenElectron = electron.screen.getPrimaryDisplay();
const { publicRuntimeConfig } = getConfig();

const app = () => (
  <Organization slug={publicRuntimeConfig.BUILDKITE_ORG_SLUG}>
    {
      ({ loading, data: { organization } }) =>
        <PipelinesList
          slug={publicRuntimeConfig.BUILDKITE_ORG_SLUG}
          pipelines={get(organization, 'pipelines.edges', [])}
        />
    }
  </Organization>
);

export default withData(app);
