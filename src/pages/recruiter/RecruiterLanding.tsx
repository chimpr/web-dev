import './style/RecruiterLanding.css';
import RecruiterWelcome from './components/RecruiterWelcome';
import RecruiterJobs from './components/RecruiterJobs';
import RecruiterEvents from './components/RecruiterEvents';

export enum RecruiterPageType {
    WELCOME = 0,
    ABOUT   = 1,
    JOBS    = 2,
    EVENTS  = 3
}

export default function RecruiterLanding(props: any) {

    const curPage    = props.page;
    const setCurPage = props.setPage;
    console.log(props.loggedInUser?.firstName);
    
    switch(curPage) {
        case RecruiterPageType.WELCOME:
            return <RecruiterWelcome loggedInUser={props.loggedInUser} setCurPage={setCurPage}/>
        case RecruiterPageType.ABOUT:
            return <RecruiterWelcome loggedInUser={props.loggedInUser} setCurPage={setCurPage}/>
        case RecruiterPageType.JOBS:
            return <RecruiterJobs loggedInUser={props.loggedInUser} setCurPage={setCurPage}/>
        case RecruiterPageType.EVENTS:
            return <RecruiterEvents loggedInUser={props.loggedInUser} setCurPage={setCurPage}/>;
        default:
            return <></>;
    }
}