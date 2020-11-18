import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  Cell,
} from 'recharts';
import ChartTitle from './ChartTitle';

export default ({ by }:{by:string}) => {
  type Count = {name:string, count:number}
  const [data, setData] = useState<Count[]>([]);
  useEffect(() => {
    axios.get(`/events/countBy/${by}`)
      .then(({ data }) => {
        if (by === 'url') {
          setData(data.map((url:Count) => {
            const lastIndex = url.name.lastIndexOf('/');
            url.name = url.name.slice(lastIndex);
            return url;
          }));
        } else {
          setData(data);
        }
      })
      .catch((e) => console.error(e));
  }, [by]);

  return (
    <div>
      <ChartTitle>{`Events by ${by}`}</ChartTitle>
      <PieChart width={400} height={250}>
        <Pie
          onMouseEnter={(e) => {
            e.originalColour = e.fill;
            e.stroke = e.fill = 'turquoise';
          }}
          onMouseOut={(e) => {
            e.fill = e.originalColour;
          }}
          label
          labelLine
          data={data}
          dataKey="count"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={90}
          legendType="square"
          fill="#8884d8"
        >
          {
            data.map((entry, index) => {
              const colour = index * 100 / data.length;
              return (
                <Cell
                  key={`cell-${index}`}
                  fill={`rgb(${colour}%,${colour}%,100%)`}
                />
              );
            })
          }
        </Pie>
        <Legend
          layout="vertical"
          align="left"
          verticalAlign="middle"
        />
        <Tooltip />
      </PieChart>
    </div>
  );
};
