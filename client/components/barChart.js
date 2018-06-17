import React from 'react'
import {ResponsiveBar} from '@nivo/bar'

// make sure parent container have a defined height when using responsive component,
// otherwise height will be 0 and no chart will be rendered.
// website examples showcase many properties, you'll often use just a few of them.

const BarChart = props => {
  const {data, keys} = props
  console.log('props data', data)
  console.log('props keys', keys)
  return (
    <div className="chart-display">
      <ResponsiveBar
        data={data}
        keys={keys}
        indexBy="user"
        margin={{
          top: 0,
          right: 130,
          bottom: 50,
          left: 60
        }}
        padding={0.3}
        colors="nivo"
        colorBy="id"
        defs={[
          {
            id: 'dots',
            type: 'patternDots',
            background: 'inherit',
            color: '#38bcb2',
            size: 4,
            padding: 1,
            stagger: true
          },
          {
            id: 'lines',
            type: 'patternLines',
            background: 'inherit',
            color: '#eed312',
            rotation: -45,
            lineWidth: 6,
            spacing: 10
          }
        ]}
        fill={[
          {
            match: {
              id: 'satisfied'
            },
            id: 'dots'
          },
          {
            match: {
              id: 'impolite'
            },
            id: 'lines'
          }
        ]}
        axisBottom={{
          orient: 'bottom',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'user',
          legendPosition: 'center',
          legendOffset: 36
        }}
        axisLeft={{
          orient: 'left',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'category',
          legendPosition: 'center',
          legendOffset: -40
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor="inherit:darker(1.6)"
        animate={true}
        motionStiffness={90}
        motionDamping={15}
        legends={[
          {
            dataFrom: 'keys',
            anchor: 'bottom-right',
            direction: 'column',
            translateX: 120,
            itemWidth: 100,
            itemHeight: 20,
            itemsSpacing: 2,
            symbolSize: 20
          }
        ]}
        theme={{
          tooltip: {
            container: {
              fontSize: '13px'
            }
          },
          labels: {
            textColor: '#555'
          }
        }}
      />
    </div>
  )
}

export default BarChart
