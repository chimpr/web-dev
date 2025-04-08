import { useEffect, useState } from 'react';
import './style/RecruiterEvents.css';
import Event from '../../../models/Event';
import EventWidget from './EventWidget';
import { Button } from '@mui/material';
import PopupOverlay from '../../../components/PopupOverlay';
import RecruiterCreateEvent from './RecruiterCreateEvent';
import { getEvents } from '../../../api/api';
import dayjs from 'dayjs';
import EventView from './EventView';

export default function RecruiterEvents(props: any) {

    const [events,setEvents] = useState<Event[]>([]);
    const [createEventVisible, setCreateEventVisible] = useState(false);
    const [eventView, setEventView] = useState<Event | null>(null);
    
    useEffect(() => {
        //  load in recruiter events.
        LoadEvents();
    }, [])

    const LoadEvents = () => {
        const eventsList: Event[] = [];
        getEvents(props.loggedInUser).then((res) => {
            if (res['Error'].toString().trim() !== '') {
                return;
            }
            res['events'].forEach((e: any) => {
                console.log(e);
                eventsList.push(new Event(e['_id'], e['Name'],e['Date']));
            });
        }).finally(() => {
              // Sort the eventsList by date
            eventsList.sort((a, b) => {
                const dateA = dayjs(a.date);
                const dateB = dayjs(b.date);
                return dateA.diff(dateB);
            });
            console.log(eventsList);
            setEvents([...eventsList]);
        });
    }

    const handleCreateEventBtnClick = () => {
        setCreateEventVisible(true);
    };

    const deleteEvent = (event: Event) => {
        LoadEvents();
    }

    return <div className='recruiter-events'>
            <div className="recruiter-events-header">
                <h1>My Events</h1>
                <Button onClick={() => handleCreateEventBtnClick()} sx={{height: 'fit-content', width: 'fit-content'}} variant='contained'>Create New Event</Button>
            </div>
            <div className='recruiter-events-wrapper'>
                {
                    events.map((e: Event, idx: number) => (
                        <EventWidget setEventView={setEventView} selfDestruct={deleteEvent} key={idx} event={e} idx={idx}/>
                    ))
                }
            </div>
            <PopupOverlay visible={createEventVisible} content={<RecruiterCreateEvent loggedInUser={props.loggedInUser} LoadEvents={LoadEvents} setCreateEventVisible={setCreateEventVisible}/>}/>
            <PopupOverlay visible={eventView !== null} content={<EventView setEventView={setEventView} event={eventView}/>}/>
         </div>
}
