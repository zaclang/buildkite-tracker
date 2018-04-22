import electron from 'electron';
import getConfig from 'next/config'
import { Spin } from 'antd';
import withData from '../lib/withData';
import PipelinesQuery from '../data/PipelinesQuery';
import PipelinesList from '../components/PipelinesList';
import './style.css';

var screenElectron = electron.screen.getPrimaryDisplay();

const { publicRuntimeConfig } = getConfig();

const app = () => (
  <PipelinesQuery slug={publicRuntimeConfig.BUILDKITE_ORG_SLUG}>
    {
      ({ pipelines, loading }) =>
        <Spin style={{ height: screenElectron.bounds.height }} size='large' spinning={loading}>
          <PipelinesList
            slug={publicRuntimeConfig.BUILDKITE_ORG_SLUG}
            pipelines={pipelines}
          />
        </Spin>
    }
  </PipelinesQuery>
);

export default withData(app);
