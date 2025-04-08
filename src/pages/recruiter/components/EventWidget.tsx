import { useEffect, useState } from "react";
import Event from "../../../models/Event";
import './style/EventWidget.css'
import { Button } from "@mui/material";
import dayjs from "dayjs";
import { deleteEvent } from "../../../api/api";

export default function EventWidget(props: any) {
    const event: Event = (props.event);
    const [daysUntilEvent, setDaysUntilEvent] = useState(0);
    const [doDelete, setDoDelete] = useState(false);
    const dateFormat = 'MM-DD-YYYY';
    useEffect(() => {
        let d = dayjs(event.date, dateFormat);
        let today = dayjs();
        setDaysUntilEvent(d.diff(today, 'day') + 1);
    },[event])

    const getColorByIndex = (index: number) => {
        const baseColor = 20; // Darker blue color
        const step = 3; // Adjust this value to control the lightness step
        const colorValue = baseColor + index * step;
        return `rgb(${colorValue % 5}, ${colorValue}, 80)`; // Darker blue shades
    };
    

    const handleDelete = () => {
        setDoDelete(true);
        deleteEvent(event.eid).then((res) => {
            if (res['Error'] !== '') {
                alert('Error deleting event: ' + res['Error']);
            } else {
                props.selfDestruct(event);
            }
        }).finally(() => setDoDelete(false));
    } 


    return <div className="event-widget-wrapper">
                <div style={{backgroundColor: getColorByIndex(daysUntilEvent)}} className="event-widget-header"/>
                <div className="event-widget-body">
                    <h1>{event.name}</h1>
                    <p>{event.date}</p>
                    <p style={{fontWeight: daysUntilEvent < 0 ? 'bold' : ''}}>
                        {/* x Days Ago // In 1 Day // In 2 Days  */}
                        {daysUntilEvent < 0 ? '' : 'In '} {Math.abs(daysUntilEvent)} Day{Math.abs(daysUntilEvent) > 1 ? 's' : ''} {daysUntilEvent < 0 ? ' Ago' : ''}
                    </p>
                    <Button onClick={() => props.setEventView(event)} sx={{width: '100%'}} variant="contained">View</Button>
                    {/* {daysUntilEvent < 0 
                        ? */}
                        <Button disabled={doDelete} onClick={handleDelete} variant="contained" sx={{backgroundColor: 'red', marginTop: '1vh'}}>Delete Event</Button>
                        {/* :
                        <></>
                    } */}
                </div>
            </div>
}
