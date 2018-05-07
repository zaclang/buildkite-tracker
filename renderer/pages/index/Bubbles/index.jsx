import React from 'react';
import ReactBubbleChart from '../../../vendor/react-bubble-chart/lib/ReactBubbleChart';
import get from 'lodash.get';
import { shell } from 'electron';

const colorLegend = [
  { color: '#B0DF21', textColor: '#000', text: 'passed' },
  { color: '#ffdc00', textColor: '#000', text: 'blocked' },
  { color: '#F83E23', textColor: '#fff', text: 'failed' }
];

const scoreMap = {
  PASSED: 1,
  BLOCKED: 4,
  FAILED: 9,
};

export default ({ data }) => {
  const bubbles = data.map(item => {
    const lastBuild = get(item, 'node.builds.edges.0.node');

    return {
      _id: `${get(item, 'node.name')} - ${get(lastBuild, 'createdBy.name')}`,
      value: scoreMap[lastBuild.state],
      colorValue: scoreMap[lastBuild.state],
      url: lastBuild.url
  }});

  return (
    <ReactBubbleChart
      colorLegend={colorLegend}
      onClick={({ url }) => shell.openExternal(url)}
      data={bubbles}
    />
  )
}