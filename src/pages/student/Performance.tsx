import React from 'react';
import { Chart } from 'react-google-charts';

interface PerformanceProps {
  score: number;
  comment: string;
}

const getPerformanceTips = (score: number) => {
    if (score < 50) {
        return [
            'Dress professionally',
            'Practice confident body language',
            'Research companies beforehand',
            'Prepare a 30-second introduction'
        ];
    } else if (score < 85) {
        return [
            'Research target companies in depth',
            'Perfect your elevator pitch',
            'Follow up with recruiters',
            'Highlight specific skills'
        ];
    }
    return [
        'Target specific role requirements',
        'Research interviewers beforehand',
        'Prepare technical case studies',
        'Schedule follow-up meetings'
    ];
};

const Performance: React.FC<PerformanceProps> = ({ score, comment }) => {
    const tips = getPerformanceTips(score);

    return (
        <div className="performance-container">
            <div className="gauge-container">
                <Chart
                    chartType="Gauge"
                    data={[
                        ['Label', 'Value'],
                        ['', score],
                    ]}
                    options={{
                        width: 300,
                        height: 300,
                        redFrom: 0,
                        redTo: 50,
                        yellowFrom: 50,
                        yellowTo: 85,
                        greenFrom: 85,
                        greenTo: 100,
                        minorTicks: 5,
                        animation: { duration: 1000, easing: 'out' },
                    }}
                />
                <div className='p-comment'>
                  <p className="performance-comment">{comment}</p>
                </div>
            </div>

            <div className="performance-tips">
                <h3>Improvement Suggestions</h3>
                <ul>
                    {tips.map((tip, index) => (
                        <li key={index}>{tip}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Performance;