import getConfig from 'next/config'
import withData from '../lib/withData';
import PipelinesQuery from '../data/PipelinesQuery';
import PipelinesList from '../components/PipelinesList';
import './styles.css';

const { publicRuntimeConfig } = getConfig();

const app = () => (
  <PipelinesQuery slug={publicRuntimeConfig.BUILDKITE_ORG_SLUG}>
    {
      ({ pipelines }) =>
        <PipelinesList
          slug={publicRuntimeConfig.BUILDKITE_ORG_SLUG}
          pipelines={pipelines}
        />
    }
  </PipelinesQuery>
);

export default withData(app);
