import {useEffect, useState} from 'react';

const Figure = ({ configurations }) => {
    const [currentConfigIndex, setCurrentConfigIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentConfigIndex(currentIndex => {
                return (currentIndex + 1) % configurations.length;
            });
        }, 50);
        return () => clearInterval(intervalId);
    }, [configurations.length]);

    const { ankle, knee, hip, shoulder, hand } = configurations[currentConfigIndex];
    const gridSpacing = 20;
    const width = 400;
    const height = 400;
    const gridLines = [];

    // vertical grid lines
    for (let x = 0; x <= width; x += gridSpacing) {
        gridLines.push(<line key={'v' + x} x1={x} y1="0" x2={x} y2={height} stroke="lightgrey" strokeWidth="1" />);
    }

    // horizontal grid lines
    for (let y = 0; y <= height; y += gridSpacing) {
        gridLines.push(<line key={'h' + y} x1="0" y1={y} x2={width} y2={y} stroke="lightgrey" strokeWidth="1" />);
    }

    return (
        <svg width="400" height="400" viewBox="0 0 400 400">
            {gridLines}
            {/* Each segment/limb of the figure */}
            <line x1={ankle.x} y1={ankle.y} x2={knee.x} y2={knee.y} stroke="red" strokeWidth="2" />
            <line x1={knee.x} y1={knee.y} x2={hip.x} y2={hip.y} stroke="orange" strokeWidth="2" />
            <line x1={hip.x} y1={hip.y} x2={shoulder.x} y2={shoulder.y} stroke="yellow" strokeWidth="2" />
            <line x1={shoulder.x} y1={shoulder.y} x2={hand.x} y2={hand.y} stroke="green" strokeWidth="2" />
            {/* Visualizing the 'joints' */}
            <circle cx={ankle.x} cy={ankle.y} r="3" fill="red" />
            <circle cx={knee.x} cy={knee.y} r="3" fill="orange" />
            <circle cx={hip.x} cy={hip.y} r="3" fill="yellow" />
            <circle cx={shoulder.x} cy={shoulder.y} r="3" fill="green" />
            <circle cx={hand.x} cy={hand.y} r="3" fill="blue" />
        </svg>
    );
};

export default Figure;
