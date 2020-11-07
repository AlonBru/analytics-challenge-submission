import React, { useEffect, useState,FC } from "react";
import axios from "axios";
// import "./RetentionCohort.css";
import { weeklyRetentionObject} from '../../models/event'
import styled, { StyledComponent } from "styled-components";
import ChartTitle from './ChartTitle'


  interface weekBlockProps {
    className?: "weekDataBlock";
    percent:number;
    key?:string
  }
  
  const WeekBlock :FC<weekBlockProps> = ({className,percent}) =>{
    return <td 
    
    className={className}
    title={percent+'%'}
      >
    </td>
  }
  
  const BlockStyled = styled(WeekBlock)`
    min-height:10%;
    box-shadow: black 1px 1px 1px 1px;
    background-color:rgb(${({percent})=>(100 - percent) + "%"},${({percent})=>(100 - percent) + "%"},100%);
  `

const weekDataBlock = (week: weeklyRetentionObject) => {
  const { registrationWeek, weeklyRetention } = week;
  return weeklyRetention.map((percent, i) => {
    return (
      <BlockStyled key={`week${registrationWeek}block${i}`} percent={percent}/>
    );
  });
};

const RetentionCohort = () => {
  const [weeks, setWeeks] = useState<weeklyRetentionObject[]>([]);
  useEffect(()=>{
    axios.get("http://localhost:3001/events/retention?dayZero=1601524800000")
    .then(({data}:{data:weeklyRetentionObject[]})=>{
      console.log(data)
      setWeeks((data))});
  },[])
  
  const totalUsers = weeks.reduce((total, current) => {
    return total + current.newUsers;
  }, 0);

  function CalculateAllUsersRetention(registrationWeek: number) {
    const retentionByWeek: number[] = weeks.map(({weeklyRetention}) => {
      return weeklyRetention[registrationWeek];
    });
    const trimmedArray = retentionByWeek //remove undefined values
    .filter((weeklyRetention) => typeof weeklyRetention === 'number');
    console.log(trimmedArray)
    return Math.round(
      trimmedArray.reduce((total, cur) => total + cur, 0)/ trimmedArray.length
      );
  }

  return (
    <div className="retention-cohort">
      <ChartTitle> Weekly Retention Cohort </ChartTitle>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>registration</th>
              {weeks.map((week) => (
                <th key={"week" + week.registrationWeek}>{
                  `week ${week.registrationWeek}`
                  }</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className='weekly-percents'>
              <td>All users</td>
              {weeks.map(({ registrationWeek }) => (
                <td key={"week" + registrationWeek + "ret"}>
                  {CalculateAllUsersRetention(registrationWeek) + "%"}
                </td>
              ))}
            </tr>
            {weeks.map((week) => {
              return (
                <tr key={"week" + week.registrationWeek} className="retention-week">
                  <td
                  title={`${week.start} ${'→'} ${week.end}`}
                  >
                    {`week ${week.registrationWeek}`}
                  </td>
                  {weekDataBlock(week)}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RetentionCohort;
