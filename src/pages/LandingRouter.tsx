// This will route the user to the correct landing -- either student or recruiter, or it will redirect

import { Button } from "@mui/material";
import Logo from "../components/logo";
import RecruiterLanding, { RecruiterPageType } from "./recruiter/RecruiterLanding";
import './style/LandingRouter.css'
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function LandingRouter() {

    // custom button styling
    const NavBtnStyle = {color: 'black'};
    const LogOutBtnStyle = { backgroundColor: 'black', color: 'white', '&:hover': { backgroundColor: '#141414' }};

    const isRecruiter = true;

    const navigate = useNavigate();

    const LogOutBtnClick = () => {
        // navigate to login
        navigate('/');
    }


    // recruiter stuff.
    const [recruiterInitialPageType, setRecruiterInitialPageType] = useState(RecruiterPageType.WELCOME);
    const handleJobsBtnClick = () => {
        setRecruiterInitialPageType(RecruiterPageType.JOBS);
    }

    const handleEventsBtnClick = () => {
        setRecruiterInitialPageType(RecruiterPageType.EVENTS);
    }

    return (
        <div className="landing-wrapper">
            <div className="landing-header">
                <Logo/>
                <div className="landing-header-nav-bar">
                    <Button sx={NavBtnStyle}>About Us</Button>

                    {isRecruiter 
                        ? 
                            <>
                                <Button onClick={handleJobsBtnClick}   sx={NavBtnStyle}>Jobs</Button>
                                <Button onClick={handleEventsBtnClick} sx={NavBtnStyle}>Upcoming Events</Button>
                            </> 
                        : 
                            <>
                            </> 
                    }


                    <Button 
                        variant="contained"
                        sx={LogOutBtnStyle}
                        onClick={LogOutBtnClick}
                    >
                        Log Out
                    </Button>

                </div>
            </div>
            <div className="landing-content">
                {
                    // determine user type
                    <RecruiterLanding page={recruiterInitialPageType} setPage={setRecruiterInitialPageType}/>
                }
            </div>
        </div>
    )
}