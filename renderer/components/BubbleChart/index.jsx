import React from 'react';
import ReactBubbleChart from '../../vendor/react-bubble-chart/lib/ReactBubbleChart';
import get from 'lodash.get';

const colorLegend = [
  // reds from dark to light
  { color: '#B0DF21', textColor: '#000', text: 'passing' },
  { color: '#F83E23', textColor: '#fff', text: 'failing' }
];

const states = {
  FAILED: 100,
  PASSED: 1,
  BLOCKED: 25
};

export default ({ data }) => {
  const bubbles = data.map(item => {
    const builds = get(item, 'node.builds.edges');
    const lastBuild = get(builds, '0.node');

    let val = 0;
    builds.forEach(({ node }) => {
      val += states[node.state]
    });

    return {
      _id: `${get(item, 'node.name')} - ${get(lastBuild, 'createdBy.name')}`,
      value: val,
      colorValue: val,
      selected: false
  }});

  console.log(bubbles)

  return (
    <ReactBubbleChart
      colorLegend={colorLegend}
      selectedColor="#737373"
      selectedTextColor="#d9d9d9"
      // onClick={Actions.loadArticlesForEntity.bind(Actions)}
      data={bubbles}
      />
  )
}