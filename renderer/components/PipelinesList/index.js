import React from 'react';
import { Row, Col, Alert } from 'antd';
import SinglePipelineQuery from '../../data/SinglePipelineQuery';
import Build from '../Build';
import User from '../User';
import './style.css';

const PipelinesList = ({ slug, pipelines }) =>
  pipelines.map(({ node }) =>
    <SinglePipelineQuery
      key={node.id}
      slug={`${slug}/${node.slug}`}
    >
      {
        ({ pipeline, builds }) =>
          <Row type='flex' justify='center' className='row'>
            <Col span={12}>
              <span className='content'>{ pipeline.name }</span>
            </Col>
            {
              builds.map(({ node }) =>
                <React.Fragment key={node.id}>
                  <Col span={6}>
                    <User className='content' { ...node.createdBy } />
                  </Col>
                  <Col span={6}>
                    <Build state={node.state} />
                  </Col>
                </React.Fragment>
              )
            }
          </Row>
      }
    </SinglePipelineQuery>
  );

export default PipelinesList;
