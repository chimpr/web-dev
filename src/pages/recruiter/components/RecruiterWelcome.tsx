import { Button } from '@mui/material';
import './style/RecruiterWelcome.css'
import RecruiterMonkey from './style/img/letter.png'

export default function RecruiterWelcome(props: any) {

    const buttonStyle = {height: '15vh', width: '15vw', fontSize: '1em'}
    const loggedInUser = props.loggedInUser;
    return (
        <div className='recruiter-welcome-wrapper'>
            <div className='welcome-ls'>
                <div className='welcome-text-area'>
                    <h1>Welcome {loggedInUser?.firstName} </h1>
                    <p>What would you like to do today?</p>
                </div>
                <div className='welcome-buttons'>
                    <Button sx={buttonStyle} variant='contained'>Create New Event</Button>
                    <Button sx={buttonStyle} variant='contained'>Post New Job</Button>
                </div>
            </div>
            <div className='welcome-rs'>
                <img src={RecruiterMonkey}/>
            </div>
        </div>
    );
}