import './style/EventView.css'
import { Button } from "@mui/material";
import Event from "../../../models/Event";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import CandidateWidget from './CandidateWidget';

export default function EventView(props: any) {
    const event: Event = props.event;

    return <div className="view-event-wrapper">
            <div className="view-event-header">
                <h1>{event?.name} - {event?.date}</h1>
            </div>
            <div className="view-event-body">
                {event !== null && event.candidates !== undefined ? event.candidates.map((c,idx) => (
                    <CandidateWidget setViewingCandidate={props.setViewingCandidate} showScore={false} candidate={c}/>
                )) : <p>No Candidates Scanned</p>}
            </div>
            <div className="view-event-button">
                <Button onClick={() => props.setEventView(null)}>Close</Button>
            </div>
          </div>
}