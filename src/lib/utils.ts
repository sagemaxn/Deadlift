type configurations = JOINTS[]

interface JOINT {
    x: number;
    y: number
}

//considering hand to be a joint for simplicity
interface JOINTS {
    shoulder: JOINT;
    hip: JOINT;
    knee: JOINT;
    ankle: JOINT;
    hand: JOINT;
}

interface end {
    JOINTS: JOINTS;
    configurations: configurations
}

const JOINT_CONSTRAINTS = {
    shoulder: {
        min: 0,
        max: Math.PI / 2
    },
    hip: {
        min: 0,
        max: Math.PI / 2
    },
    knee: {
        min: 0,
        max: 2.356
    },
    ankle: {
        min: 0,
        max: 0.262
    }
};


interface LIMB_LENGTHS {
    lowerLeg: number
    upperLeg: number;
    torso: number;
    arm: number
}

// Starting point
const foot = { x: 100, y: 300 };
//ending point
const hand = { x: 123, y: 278}

interface Position {
    x: number;
    y: number;
}

interface Angles {
    shoulder: number;
    hip: number;
    knee: number;
    ankle: number;
}

function calculateDistance(start: Position, end: Position, expectedDistance: number): boolean {
    const deltaX = end.x - start.x;
    const deltaY = end.y - start.y;
    const actualDistance = Math.sqrt(deltaX ** 2 + deltaY ** 2);
    console.log(`expected: ${expectedDistance}`)
    console.log(`actual distance: ${actualDistance}`)

    //is the difference in expected length and actual length < 0.5
    let dist = Math.abs(actualDistance - expectedDistance) < 0.5
    console.log(`dist: ${dist}`);
    return dist;

}


function calculateShoulderPosition(hipPosition: Position, targetShoulderX: number, torsoLength: number): number {
    const deltaX = targetShoulderX - hipPosition.x;
    const deltaY2 = torsoLength**2 - deltaX**2;
    const deltaY = Math.sqrt(deltaY2);
    return hipPosition.y - deltaY;
}

    export function calculateJointPositionsFromAngles(angles: Angles, limbLengths: LIMB_LENGTHS, foot: { x: number; y: number; }) {
    const kneeAngleRad = angles.ankle
    const hipAngleRad = angles.knee;

    const ankle = { ...foot };

    const knee = {
        x: ankle.x + limbLengths.lowerLeg * Math.sin(kneeAngleRad),
        y: ankle.y - limbLengths.lowerLeg * Math.cos(kneeAngleRad)
    };

    const hip = {
        x: knee.x - limbLengths.upperLeg * Math.sin(hipAngleRad),
        y: knee.y - limbLengths.upperLeg * Math.cos(hipAngleRad)
    };

    const shoulderY = calculateShoulderPosition(hip, hand.x, limbLengths.torso)
    const shoulder = {
        x: hand.x,
        y: shoulderY,
    };
    return { shoulder, hip, knee, ankle, hand };
}


export function findOptimalConfiguration(limbLengths: LIMB_LENGTHS): end {
    // Start with the knee as flexed as possible for the lowest hip position
    let kneeAngle = JOINT_CONSTRAINTS.knee.max

    let configurations: configurations = [];
    let angles: Angles = {
        shoulder: 0,
        hip: JOINT_CONSTRAINTS.hip.min,
        knee: kneeAngle,
        ankle: JOINT_CONSTRAINTS.ankle.min
    };

    let configurationFound = false;
    let { shoulder, knee, ankle, hip} = calculateJointPositionsFromAngles(angles, limbLengths, foot);

    while (!configurationFound) {
        ({ shoulder, knee, ankle, hip } = calculateJointPositionsFromAngles(angles, limbLengths, foot));
        let canReach = calculateDistance(shoulder, hand, limbLengths.arm);

        configurations.push({shoulder, knee, ankle, hip, hand});


        if (canReach) {
            console.log('can reach!!')
            configurationFound = true;
        } else {
            kneeAngle -= Math.PI / 180; // Decreasing by one degree in radians
            console.log(`knee angle: ${kneeAngle}`)
            if (kneeAngle < JOINT_CONSTRAINTS.knee.min) {
                console.log('Knee angle is beyond allowed minimum');
                break;
            }
            angles.knee = kneeAngle;
        }
    }

    if (configurationFound) {

        console.log('configuration found')
        console.log(configurations)
        return {JOINTS: {shoulder, knee, ankle, hip, hand}, configurations};
    }
    else {
        console.log(`no config found`)
        console.log(configurations)
        return {JOINTS:
                {
                    shoulder, knee, ankle, hip, hand
                }, configurations}
    }
}


