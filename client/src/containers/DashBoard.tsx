import React,{useEffect,useState} from "react";
import styled from 'styled-components'
import ErrorBoundary from './ErrorBoundary'
import {Tile,TileContainer} from './DashComponents'
import axios from 'axios'
import{ 
  Map,
  Retention,
  ByDay,
  ByHour
} from '../components/analytics'
const DashBoard: React.FC = () => {

  return (

      <TileContainer>
        <ErrorBoundary>
          <Tile wide>
            <Map/>
          </Tile>
        </ErrorBoundary>
        <ErrorBoundary>
          <Tile>
            <ByHour/>
          </Tile>
        </ErrorBoundary>
        <ErrorBoundary>
          <Tile>
            <ByDay/>
          </Tile>
        </ErrorBoundary>
        <ErrorBoundary>
          <Tile>
            <Retention/>
          </Tile>
        </ErrorBoundary>
        <ErrorBoundary>
          <Tile>

          </Tile>
        </ErrorBoundary>
      </TileContainer>
  );
};

export default DashBoard
