import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  Brush,
  Line,
} from 'recharts';
import { Event } from '../../models/event';
import ChartTitle from './ChartTitle';

const OneDay = 1000 * 60 * 60 * 24;

const ByDays = () => {
  const [data, setData] = useState<Event[]>([]);
  const [offset, setOffset] = useState<number>(0);
  useEffect(() => {
    axios.get(`/events/by-hours/${offset}`)
      .then(({ data }) => setData(data))
      .catch((e) => console.error(e));
  }, [offset]);
  return (
    <div>
      <ChartTitle>Sessions By Hour </ChartTitle>
      <button
        onClick={() => { setOffset(offset + 1); }}
      >
back
      </button>
       date:
      {' '}
      {offset === 0
        ? 'today'
        : new Date(Date.now() - offset * OneDay).toDateString().slice(4)}
      <button
        onClick={() => { setOffset(offset - 1); }}
        disabled={offset === 0}
      >
forward
      </button>
      <LineChart
        width={500}
        height={220}
        data={data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <XAxis dataKey="hour" reversed />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="count" stroke="#82ca9d" />
        <Brush />
      </LineChart>
    </div>
  );
};
export default ByDays;
