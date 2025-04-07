// This will route the user to the correct landing -- either student or recruiter, or it will redirect

import { Button } from "@mui/material";
import Logo from "../components/logo";
import RecruiterLanding, { RecruiterPageType } from "./recruiter/RecruiterLanding";
import './style/LandingRouter.css'
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import StudentProfileContainer from "./student/StudentProfileContainer";
import User, { Role } from "../models/User";

export default function LandingRouter(props: any) {

    // custom button styling
    const NavBtnStyle = {color: 'black'};
    const LogOutBtnStyle = { backgroundColor: 'black', color: 'white', '&:hover': { backgroundColor: '#141414' }};

    // handle props.
    const [loggedInUser,setLoggedInUser] = useState<User | null>(props.loggedInUser)
    const navigate = useNavigate();

    const LogOutBtnClick = () => {
        // navigate to login
        navigate('/');
        setLoggedInUser(null);
    }

    // shared stuff
    const handleHomeBtnClicked = () => {
        if(loggedInUser?.role === Role.RECRUITER) {
            setRecruiterInitialPageType(RecruiterPageType.ABOUT)
        }
    }

    // runs when page loads.
    useEffect(() => {
        // navigate back to login if user is invalid.
        if (loggedInUser === null) {
            navigate("/");
        }
    }, [])

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
                    <Button onClick={handleHomeBtnClicked} sx={NavBtnStyle}>Home</Button>

                    {loggedInUser?.role === Role.RECRUITER 
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
                    (loggedInUser?.role === Role.RECRUITER) 
                    ?
                        <RecruiterLanding loggedInUser={loggedInUser} page={recruiterInitialPageType} setPage={setRecruiterInitialPageType}/>
                        :
                        <StudentProfileContainer 
                            userId={loggedInUser?.uid} 
                        />
                    }
            </div>
        </div>
    )
}