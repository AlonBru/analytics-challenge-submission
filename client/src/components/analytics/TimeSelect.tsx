import React, { useEffect, useState, FC } from 'react';
import axios from 'axios';
// import "./RetentionCohort.css";
import styled, { StyledComponent } from 'styled-components';
import { weeklyRetentionObject } from '../../models/event';

const TimeSelect = ({ selectTime }:{selectTime:(n: number) => void}) => {
  const day = '00';
  const month = '00';
  const year = '00';
  return (
    <div>
      <input type="number" placeholder="dd" />
/
      <input type="number" placeholder="mm" />
/
      <input type="number" placeholder="yy" />
      {/* <button onClick={}>select </button> */}
    </div>
  );
};

export default TimeSelect;
