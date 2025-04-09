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
import Candidate from '../../../models/Candidate';
import StudentProfileContainer from '../../student/StudentProfileContainer';

export default function RecruiterEvents(props: any) {

    const [events,setEvents] = useState<Event[]>([]);
    const [createEventVisible, setCreateEventVisible] = useState(false);
    const [eventView, setEventView] = useState<Event | null>(null);
    const [viewingCandidate, setViewingCandidate] = useState<Candidate | null>(null);

    useEffect(() => {
        //  load in recruiter events.
        LoadEvents();
    }, [])

    const SelectedCandidateView = () => {
        return <div className='recruiter-student-view-wrapper-outer'>
                    <div className='recruiter-student-view-wrapper-inner'>
                            <StudentProfileContainer recruiterViewID={viewingCandidate?.cid}/>
                    </div>
                    <Button onClick={() => setViewingCandidate(null)}>Done</Button>
               </div>
    }

    const LoadEvents = () => {
        const eventsList: Event[] = [];
        getEvents(props.loggedInUser).then((res) => {
            if (res['Error'].toString().trim() !== '') {
                return;
            }
            res['events'].forEach((e: any) => {
                console.log(e);
                eventsList.push(new Event(e['_id'], e['Name'],e['Date'], e['Students'] instanceof Array ? e['Students'] : []));
            });
        }).finally(() => {
              // Sort the eventsList by date
            eventsList.sort((a, b) => {
                const dateA = dayjs(a.date);
                const dateB = dayjs(b.date);
                return dateA.diff(dateB);
            });
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
            <PopupOverlay visible={eventView !== null} content={
                viewingCandidate !== null ? 
                <SelectedCandidateView/>
                :
                <EventView setViewingCandidate={setViewingCandidate} setEventView={setEventView} event={eventView}/>
                }/>
         </div>
}
