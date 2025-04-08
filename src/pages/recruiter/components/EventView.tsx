import './style/EventView.css'
import { Button } from "@mui/material";
import Event from "../../../models/Event";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

export default function EventView(props: any) {
    const event: Event = props.event;
  
    return <div className="view-event-wrapper">
            <div className="view-event-header">
                <h1>{event?.name} - {event?.date}</h1>
            </div>
            <div className="view-event-body">

            </div>
            <div className="view-event-button">
                <Button onClick={() => props.setEventView(null)}>Close</Button>
            </div>
          </div>
}