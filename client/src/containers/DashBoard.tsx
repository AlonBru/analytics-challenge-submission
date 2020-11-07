import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import ErrorBoundary from './ErrorBoundary';
import { Tile, TileContainer } from '../components/DashComponents';
import {
  Map,
  Retention,
  ByDay,
  ByHour,
  PieChart,
  EventsLog,
} from '../components/analytics';

const DashBoard: React.FC = () => (

  <TileContainer>
    <ErrorBoundary>
      <Tile>
        <Retention />
      </Tile>
    </ErrorBoundary>
    <ErrorBoundary>
      <Tile>
        <EventsLog />
      </Tile>
    </ErrorBoundary>
    <ErrorBoundary>
      <Tile>
        <PieChart by="os" />
      </Tile>
    </ErrorBoundary>
    <ErrorBoundary>
      <Tile>
        <PieChart by="browser" />
      </Tile>
    </ErrorBoundary>
    <ErrorBoundary>
      <Tile>
        <PieChart by="url" />
      </Tile>
    </ErrorBoundary>
    <ErrorBoundary>
      <Tile wide>
        <Map />
      </Tile>
    </ErrorBoundary>
    <ErrorBoundary>
      <Tile>
        <ByHour />
      </Tile>
    </ErrorBoundary>
    <ErrorBoundary>
      <Tile>
        <ByDay />
      </Tile>
    </ErrorBoundary>
    <ErrorBoundary>
      <Tile />
    </ErrorBoundary>
  </TileContainer>
);

export default DashBoard;
