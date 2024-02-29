import {calculateDistance} from "@/lib/utils";

const Figure = ({ ankle, knee, hip, shoulder, hand, neck }) => {
    console.log(neck)
    return (
        <>
            {/* Each segment/limb of the figure */}
            <line x1={ankle.x} y1={ankle.y} x2={knee.x} y2={knee.y} stroke="red" strokeWidth="2" id={'lowerLeg'}/>
            <line x1={knee.x} y1={knee.y} x2={hip.x} y2={hip.y} stroke="orange" strokeWidth="2" id={'upperleg'}/>
            {/*using the corrected ending x and y for the torso*/}
            <line x1={hip.x} y1={hip.y} x2={shoulder.x} y2={shoulder.y} stroke="yellow" strokeWidth="2" id={'torso'}/>
            {/*/!* the figure's head*!/*/}
            <circle cx={neck.x} cy={neck.y} r={7.2} fill="red" id={'head'}/>
            <line x1={shoulder.x} y1={shoulder.y} x2={hand.x} y2={hand.y} stroke="green" strokeWidth="2" id={'arm'}/>
            {/* Visualizing the 'joints' */}
            <circle cx={ankle.x} cy={ankle.y} r="3" fill="red" />
            <circle cx={knee.x} cy={knee.y} r="3" fill="orange" />
            <circle cx={hip.x} cy={hip.y} r="3" fill="yellow" />
            <circle cx={shoulder.x} cy={shoulder.y} r="3" fill="green" />
            <circle cx={hand.x} cy={hand.y} r="3" fill="blue" />
        </>
    );
};

export default Figure;
