import React from 'react';
import ReactBubbleChart from '../../vendor/react-bubble-chart/lib/ReactBubbleChart';
import get from 'lodash.get';
import { shell } from 'electron';

const colorLegend = [
  { color: '#B0DF21', textColor: '#000', text: 'passing' },
  { color: '#ffdc00', textColor: '#000', text: 'blocked' },
  { color: '#F83E23', textColor: '#fff', text: 'failing' }
];

const states = {
  FAILED: 100,
  PASSED: 10,
  BLOCKED: 25
};

export default ({ data }) => {
  const bubbles = data.map(item => {
    const builds = get(item, 'node.builds.edges');
    const lastBuild = get(builds, '0.node');

    let score = 0;
    builds.forEach(({ node }) => {
      score += states[node.state]
    });

    return {
      // _id: `${get(item, 'node.name')} - ${get(lastBuild, 'createdBy.name')}`,
      _id: `${get(item, 'node.name')} - ${score}`,
      value: score,
      colorValue: score,
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