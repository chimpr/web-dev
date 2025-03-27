import './style/CandidateWidget.css'

export default function CandidateWidget(props: any) {
    return <button className="candidate-widget-wrapper">
                <p>{props.name}</p>
            </button>
}