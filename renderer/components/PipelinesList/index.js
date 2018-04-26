import React from 'react';
import { Row, Col, Alert } from 'antd';
import get from 'lodash.get';
import { distanceInWordsStrict } from 'date-fns'

import Pipeline from '../../data/Pipeline';
import Build from '../Build';
import User from '../User';

import './style.css';

const PipelinesList = ({ slug, pipelines }) => {
  return <Col className='container'>
  {pipelines.map(({ node }) => {
    return <Pipeline
      key={node.id}
      slug={`${slug}/${node.slug}`}
    >
      {
        ({ loading, data: { pipeline } }) => {
          const builds = get(pipeline, 'builds.edges', []);

          return builds.length > 0 && (
            <Row
              type='flex'
              justify='center'
              className='row'
            >
              <Col span={8}>
                <div className='content'>
                  { get(pipeline, 'name') }
                </div>
              </Col>
              {
                builds.map(({ node: build }) => {
                  return (
                    <React.Fragment key={build.id}>
                      <Col span={4}>
                        <User
                          className='content'
                          {...build.createdBy}
                        />
                      </Col>
                      <Col span={4}>
                        <Build
                          state={build.state}
                          url={build.url}
                        />
                      </Col>
                      <Col span={4}>
                        <div className='content'>
                          { build.finishedAt ?
                            <React.Fragment>
                              { distanceInWordsStrict(build.finishedAt, new Date()) }
                              <span> ago</span>
                            </React.Fragment>
                            : '?'}
                        </div>
                      </Col>
                      <Col span={4}>
                        <div className='content'>
                          {
                            distanceInWordsStrict(build.createdAt, build.finishedAt || new Date())
                          }
                        </div>
                      </Col>
                    </React.Fragment>
                  );
                })
              }
            </Row>
          )}
      }
    </Pipeline>
  })
}
</Col>
}

export default PipelinesList;
