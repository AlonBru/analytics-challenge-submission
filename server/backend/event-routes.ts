///<reference path="types.ts" />

import express from "express";
import { Request, Response } from "express";

// some useful database functions in here:
import {
  createEvent,
  getAllEvents,
  getRetentionCohort,
  getSessionsByDay
} from "./database";
import { Event, eventData, eventName, weeklyRetentionObject } from "../../client/src/models/event";
import { ensureAuthenticated, validateMiddleware } from "./helpers";

import {
  shortIdValidation,
  searchValidation,
  userFieldsValidator,
  isUserValidator,
} from "./validators";
const router = express.Router();

// Routes

interface Filter {
  sorting: string;
  type: string;
  browser: string;
  search: string;
  offset: number;
}

router.get('/all', (req: Request, res: Response) => {
  try{

    const all = getAllEvents({})
    res.status(200).json(all)
  }catch(error){
    console.error(error)
  }
});


router.get('/all-filtered', (req: Request, res: Response) => {
  const {
    sorting,
    type,
    browser,
    search,
    offset
  } = req.query
  
  const filter = {
    sorting:sorting,
    type,
    browser,
    search,
    offset: Number(offset)||0
  }
  const filteredEvents = getAllEvents(filter)
  res.json(filteredEvents)
});

router.get('/by-days/:offset', (req: Request, res: Response) => {
  try{
  const {offset} = req.params
  res.json(getSessionsByDay(Number(offset)))
  }catch(error){
    console.error(error)
  }
});

router.get('/by-hours/:offset', (req: Request, res: Response) => {
  res.send('/by-hours/:offset')
});

router.get('/today', (req: Request, res: Response) => {
  res.send('/today')
});

router.get('/week', (req: Request, res: Response) => {
  res.send('/week')
});

router.get('/retention', (req: Request, res: Response) => {
  try{

    const {dayZero}:{dayZero:number|string} = req.query
    const retentionCohort:weeklyRetentionObject[] = getRetentionCohort(Number(dayZero));
    
    res.json(retentionCohort);
  } catch( error ){
    console.error(error)
  }
});

router.get('/:eventId',(req : Request, res : Response) => {
  res.send('/:eventId')
});

router.post('/', (req: Request, res: Response) => {
  const eventData:eventData = req.body
  console.log(typeof eventData)
  createEvent(eventData)
  res.status(200).send('')
});

router.get('/chart/os/:time',(req: Request, res: Response) => {
  res.send('/chart/os/:time')
})

  
router.get('/chart/pageview/:time',(req: Request, res: Response) => {
  res.send('/chart/pageview/:time')
})

router.get('/chart/timeonurl/:time',(req: Request, res: Response) => {
  res.send('/chart/timeonurl/:time')
})

router.get('/chart/geolocation/:time',(req: Request, res: Response) => {
  res.send('/chart/geolocation/:time')
})


export default router;
