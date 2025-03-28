import './style/style.css';
import Login from "./components/login";
import { useState } from 'react';
import StudentSignUp from './components/StudentSignUp';

export enum PageType {
    LOGIN             = 0,
    SIGN_UP_RECRUITER = 1,
    SIGN_UP_STUDENT   = 2,
}

export default function MainIsland(props: any) {

    const [curPage, setCurPage] = useState(PageType.LOGIN);

    const CurrentPage = () => {
        switch(curPage) {
            case PageType.LOGIN:
                return <Login setLoggedInUser={props.setLoggedInUser} setCurPage={setCurPage}/>
            case PageType.SIGN_UP_RECRUITER:
                return <><h1>Recruiter Sign Up</h1></>;
            case PageType.SIGN_UP_STUDENT:
                return <StudentSignUp setCurPage={setCurPage}/>
            default:
                return <Login/>
        }
    }
    return <>
            <div className="main">
                <div className="bg"/>
                <div className="bg bg2"/>
                <div className="bg bg3"/>
                <div className="island">
                    <CurrentPage/>
                </div>
            </div>
            </>;
}