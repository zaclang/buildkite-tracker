import React from 'react';
import { Row, Col, Alert } from 'antd';
import get from 'lodash.get';
import Pipeline from '../../data/Pipeline';
import Build from '../Build';
import User from '../User';

import './style.css';

const PipelinesList = ({ slug, pipelines }) => {
  return pipelines.map(({ node: pipeline }) =>
    <Pipeline
      key={pipeline.id}
      slug={`${slug}/${pipeline.slug}`}
    >
      {
        ({ loading, data: { pipeline = {} } }) => {
          return (
            <Row type='flex' justify='center' className='row'>
              <Col span={12}>
                <span className='content'>{pipeline.name}</span>
              </Col>
              {
                get(pipeline, 'builds.edges', []).map(({ node: build }) => {
                  return (
                    <React.Fragment key={build.id} style={{ background: 'red' }}>
                      <Col span={6}>
                        <User className='content' {...build.createdBy} />
                      </Col>
                      <Col span={6}>
                        <Build state={build.state} />
                      </Col>
                    </React.Fragment>
                  )
                })
              }
            </Row>
          );
        }
      }
    </Pipeline>
  )};

export default PipelinesList;
