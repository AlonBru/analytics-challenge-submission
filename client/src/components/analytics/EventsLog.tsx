import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Event } from '../../models/event';
import ChartTitle from './ChartTitle';
const SearchBar = styled.input`
  width:120px;
  `;
const SideBar = styled.div`
  display:flex;
  flex-direction:column;
  justify-items:space-between;
  .log{
    border:1px steelblue solid;
    height:210px;
    overflow-y:scroll;
  }

`;
const SideBySide = styled.div`
  display:flex;
  flex-direction:row;
  *{margin-left:2px;}
`;
const EventLine = styled.div`
b{
  color:indigo;
}
display:flex;
flex-direction:row;
*{margin-left:2px;}
padding:2px;
background-color:white;
border:solid .5px black;

`;

type Filter = {
  type:string;
  browser:string;
  search:string;
}
const FiltersBar = ({ selectFilters }:{selectFilters:(value:any)=>void}) => {
  // const FiltersBar = () =>{
  const [filters, setFilters] = useState<{[key:string]:string[], type:string[], browser:string[]}>();
  const [type, setType] = useState('');
  const [browser, setBrowser] = useState('');
  const [search, setSearch] = useState('');
  useEffect(() => {
    axios.get('/events/filters')
      .then(({ data }) => { setFilters(data); });
  }, []);
  const clearAll = () => {
    setType('');
    setBrowser('');
    setSearch('');
  };
  const send = () => {
    const filterObject = {
      type,
      browser,
      search,
    };
    selectFilters(filterObject);
  };
  if (filters) {
    return (
      <SideBar>
        <h2>Filters</h2>
          <SearchBar
            onChange={({ target }) => { setSearch(target.value); }}
            placeholder='search in events '
          />

        {Object.keys(filters).map((value) => (
          <label key={value}>
            {' '}
            {value}
            <select
              name={value}
              onChange={({ target }) => {
                value === 'type'
                  ? setType(target.value)
                  : setBrowser(target.value);
              }}
            >
              <option value="">None </option>
              {filters[value].map((name:string) => (
                <option key={name} value={name}>{name}</option>
              ))}
            </select>
          </label>
        ))}
        <span>
          <button onClick={send}>
          filter
          </button>
          <button onClick={clearAll}>
          clear
          </button>
        </span>
      </SideBar>
    );
  }
  return <h1>Loading...</h1>;
};

const EventsLog = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [filter, setFilter] = useState<Filter>(
    {
      type: '',
      browser: '',
      search: '',
    },
  );
  const [page, setPage] = useState<number>(0);
  const [sort, setSort] = useState<'-'|'+'>('+');

  const { type, browser, search } = filter;
  const url = `/events/all-filtered?sort=${sort}&type=${type}&browser=${browser}&search=${search}&page=0`;
  const refresh = () => {
    axios.get(url)
      .then(({ data }:{data:Event[]}) => {
        setEvents(data
          .sort(({ date: date1 }, { date: date2 }) => (sort === '-'
            ? date1 - date2
            : date2 - date1)));
        setPage(0);
      });
  };
  useEffect(refresh, [filter]);

  const nextPage = () => {
    if (page + 1 === events.length / 10) {
      const url = `/events/all-filtered?sort=${sort}&type=${type}&browser=${browser}&search=${search}&page=${page + 1}`;
      axios.get(url)
        .then(({ data }) => {
          const newData = events.concat(data);
          setEvents(newData);
        });
    }
    setPage(page + 1);
  };
  const sortEntries = () => {
    setSort(sort === '+' ? '-' : '+');
    const sortedEvents = events.sort(({ date: date1 }, { date: date2 }) => (sort === '-'
      ? date1 - date2
      : date2 - date1));
    setEvents(sortedEvents)
  };

  // return <FiltersBar selectFilters={setFilters} />
  return (
    <div>
      <ChartTitle>Events Log</ChartTitle>
    <SideBySide>
      <FiltersBar selectFilters={setFilter} />
      {events.length
        ? (
          <SideBar>
            <div className='log'>
              {events.slice(page, page + 10).map((event) => (
                <EventLine key={event._id}>
                <span>
                  <b>type:</b>
                  {' '}
                  {event.name}
                </span>
                <span>
                  <b>time:</b>
                  {' '}
                  {new Date(event.date).toString().slice(4, 21)}
                </span>
                <span>
                  <b>browser:</b>
                  {' '}
                  {event.browser}
                </span>
                <span>
                  <b>user:</b>
                  {' '}
                  {event.distinct_user_id}
                </span>
              </EventLine>
            ))}
            </div>
            <SideBySide>
              <button onClick={() => { setPage(page ? page - 1 : 0); }}>
                {'<'}
              </button>
         page:
              {page}
              <button onClick={nextPage}>
                {'>'}
              </button>
              <label>
        sort by date
                <button onClick={sortEntries}>
                  {sort === '+' ? 'ascending' : 'descending'}
                </button>
              </label>
              <button
                onClick={refresh}
                title="refresh"
              >
        🗘
              </button>
            </SideBySide>
          </SideBar>
        
        )
        : <h2>Loading</h2>}
    </SideBySide>
    </div>
  );
};
export default EventsLog;
