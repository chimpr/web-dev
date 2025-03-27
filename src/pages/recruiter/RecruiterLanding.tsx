import './style/RecruiterLanding.css';
import RecruiterWelcome from './components/RecruiterWelcome';
import RecruiterJobs from './components/RecruiterJobs';

export enum RecruiterPageType {
    WELCOME = 0,
    ABOUT   = 1,
    JOBS    = 2,
    EVENTS  = 3
}

export default function RecruiterLanding(props: any) {

    const curPage    = props.page;
    const setCurPage = props.setPage;
    
    switch(curPage) {
        case RecruiterPageType.WELCOME:
            return <RecruiterWelcome setCurPage={setCurPage}/>
        case RecruiterPageType.ABOUT:
            return <RecruiterWelcome setCurPage={setCurPage}/>
        case RecruiterPageType.JOBS:
            return <RecruiterJobs setCurPage={setCurPage}/>
        case RecruiterPageType.EVENTS:
            return <><h1>Events</h1></>;
        default:
            return <></>;
    }
}