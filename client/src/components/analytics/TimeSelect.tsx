import React, { useEffect, useState,FC } from "react";
import axios from "axios";
// import "./RetentionCohort.css";
import { weeklyRetentionObject} from '../../models/event'
import styled, { StyledComponent } from "styled-components";

const TimeSelect = ({selectTime}:{selectTime:(n: number) => void}) => {
  let day = '00'
  let month = '00'
  let year= '00'
  return <div>
    <input type='number' placeholder='dd' />/
    <input type='number' placeholder='mm' />/
    <input type='number' placeholder='yy' />
    {/* <button onClick={}>select </button> */}
  </div>
}

export default TimeSelect