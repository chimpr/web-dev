import './style/RecruiterCreateEvent.css'
import { Box, Button, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider, StaticDatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import User from '../../../models/User';
import { createEvent } from '../../../api/api';


export default function RecruiterCreateEvent(props: any) {

    const [date, setDate] = useState<Dayjs | null>(dayjs());
    const [name, setName] = useState('');
    const [busy, setBusy] = useState(false);
    
    const today = dayjs();
    const invalidState = name === '' || date === null;

    const handleCancelBtnClick = () => {
        setName('');
        setDate(today);
        props.setCreateEventVisible(false);
    }

    const handleCreateEventBtnClick = () => {
        if (invalidState)
            return;
        setBusy(true);
        const user = props.loggedInUser as User;
        createEvent(user, name, date).then((res) => {
            if(res['Error'] !== '') {
                alert("Error creating event: " + res['Error']);
            } else {
                props.setCreateEventVisible(false);
            }
        }).finally(() => {
            setBusy(false);
            setName('');
            setDate(today);
            props.LoadEvents();
        });
    };

    return <div className="recruiter-create-event-wrapper">
                <div className="recruiter-create-event-txt-area">
                    <h1>Create Event</h1>
                    <TextField value={name} onChange={(t) => setName(t.target.value)} sx={{width: '100%'}} required label="Event Name"/>
                    <Box sx={{ display: 'flex',justifyContent: 'center', alignSelf: 'center'}}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <StaticDatePicker
                                value={date}
                                minDate={today}
                                onChange={(d) => setDate(d)}
                                slotProps={{
                                actionBar: {actions: []}, // This hides the toolbar including OK and Cancel buttons
                                }}
                            />
                        </LocalizationProvider>
                    </Box>
                </div>
                <div className="recruiter-create-event-btn-area">
                    <Button onClick={() => handleCancelBtnClick()}>Cancel</Button>
                    <Button disabled={invalidState} onClick={() => handleCreateEventBtnClick()} variant="contained">Create</Button>
                </div>
           </div>
}