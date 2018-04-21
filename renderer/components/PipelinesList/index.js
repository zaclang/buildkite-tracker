import { Row, Col, Alert } from 'antd';
import SinglePipelineQuery from '../../data/SinglePipelineQuery';
import Build from '../Build';

const PipelinesList = ({ slug, pipelines, loading }) => {
  console.log({loading})
  return pipelines.map(({ node }) =>
    <SinglePipelineQuery slug={`${slug}/${node.slug}`}>
      {
        ({ pipeline, builds }) =>
          <Row>
            <Col span={12}>{pipeline.name}</Col>
            <Col span={12}>
              {
                builds.map(({ node }) => <Build {...node} />)
              }
            </Col>
          </Row>
      }
    </SinglePipelineQuery>
  );
};

export default PipelinesList;
