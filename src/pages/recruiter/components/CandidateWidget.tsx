import Candidate from '../../../models/Candidate';
import './style/CandidateWidget.css'

export default function CandidateWidget(props: any) {

    const candidate: Candidate = props.candidate;
    const handleCandidateSelect = () => {
        props.setViewingCandidate(candidate);
    }

    return <button onClick={() => handleCandidateSelect()}  className="candidate-widget-wrapper">
                <p>{candidate.firstName} {candidate.lastName}</p>
                <p>{candidate.score}% Match</p>
            </button>
}