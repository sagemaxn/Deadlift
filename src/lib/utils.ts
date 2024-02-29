type configurations = JOINTS[]

interface JOINT {
    x: number;
    y: number
}

//considering hand to be a joint for simplicity. ankle is placed exactly at foot position as well
interface JOINTS {
    neck: JOINT
    shoulder: JOINT;
    hip: JOINT;
    knee: JOINT;
    ankle: JOINT;
    hand: JOINT;
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
        min: 0.262,
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
export const foot = { x: 100, y: 300 };

//ending point. x value 13 points in front of foot (barbell supposed to be placed over midfoot. Average foot length is approximately 26cm)
//Barbell would be the radius of a typical weight plate distance above the floor. Standard diameter is 45cm, so the y value is 22.5 away from foot's y value. (less than due to how it is plotted.
export const hand = { x: foot.x + 13, y: foot.y - 22.5}

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

export function calculateDistance(start: Position, end: Position): number {
    const deltaX = end.x - start.x;
    const deltaY = end.y - start.y;
    const actualDistance = Math.sqrt(deltaX ** 2 + deltaY ** 2);
    console.log(`actual distance: ${actualDistance}`)
    return actualDistance
}

export function calculateNeckAndShoulderPosition(hipPosition: Position, targetShoulderX: number, torsoLength: number) {
    const headRadius = 7.2;
    // Calculate directional vector from hip to shoulder
    let deltaX = targetShoulderX - hipPosition.x;
    let deltaY = Math.sqrt((torsoLength * 0.7) ** 2 - deltaX ** 2);
    let shoulderY = hipPosition.y - deltaY;
    let shoulder = { x: targetShoulderX, y: shoulderY };

    // Vector normalization
    let length = Math.sqrt(deltaX ** 2 + deltaY ** 2);
    let unitVectorX = deltaX / length;
    let unitVectorY = deltaY / length;

    // The additional length to get to full torso length, considering the radius of the head
    let extensionLength = torsoLength * 0.3 - headRadius;

    // Calculate neck position
    let neckX = shoulder.x + unitVectorX * extensionLength;
    let neckY = shoulder.y - unitVectorY * extensionLength;

    let neck = { x: neckX, y: neckY };

    return { shoulder, neck };
}

    export function calculateJointPositionsFromAngles(angles: Angles, limbLengths: LIMB_LENGTHS) {
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

    const {shoulder, neck} = calculateNeckAndShoulderPosition(hip, hand.x, limbLengths.torso)

    return { neck, shoulder, hip, knee, ankle };
}

export function findOptimalConfiguration(limbLengths: LIMB_LENGTHS): JOINTS {
    let kneeAngle: number = JOINT_CONSTRAINTS.knee.max;
    let configurations: any = [];
    let closestConfiguration = null;
    let closestDistance:number = Infinity;
    let adjustmentStep:number = 0.01;
    let maxAdjustmentPercentage:number = 0.20;
    let originalShoulderX:number = hand.x;
    let maxAdjustments:number = Math.ceil(maxAdjustmentPercentage / adjustmentStep);
    let adjustmentDirection:number = 1;

    // Attempt to find an initial configuration
    for (; kneeAngle >= JOINT_CONSTRAINTS.knee.min; kneeAngle -= Math.PI / 180) {
        let angles = {
            shoulder: JOINT_CONSTRAINTS.shoulder.min,
            hip: JOINT_CONSTRAINTS.hip.min,
            knee: kneeAngle,
            ankle: JOINT_CONSTRAINTS.ankle.min
        };

        let { neck, shoulder, hip, knee, ankle } = calculateJointPositionsFromAngles(angles, limbLengths);
        let currentDistance = calculateDistance(shoulder, hand)
        let config = {ankle, knee, hip, shoulder, neck, hand}
        // Update closest configuration if this one is better
        if (currentDistance < closestDistance) {
            closestDistance = currentDistance;
            closestConfiguration = config;
        }
        configurations.push(config)

        // Check if the hand can reach the target within the margin

        if (Math.abs(currentDistance - limbLengths.arm) < 0.5) {
            console.log(`config found, expected length: ${limbLengths.arm}, actual length: ${currentDistance}`)
            return config;
        }
    }

    // If initial configuration not found, adjust shoulder x value position iteratively
    for (let i = 0; i < maxAdjustments && closestConfiguration; i++) {
        let adjustedShoulderX = originalShoulderX + (originalShoulderX * maxAdjustmentPercentage * adjustmentDirection * (i + 1));
        closestConfiguration.shoulder.x = adjustedShoulderX;
        let {shoulder, neck}= calculateNeckAndShoulderPosition(closestConfiguration.hip, adjustedShoulderX, limbLengths.torso);
        closestConfiguration.shoulder = shoulder
        closestConfiguration.neck = neck

        configurations.push(closestConfiguration)

        // Check if this adjusted configuration works
        let currentDistance = calculateDistance(closestConfiguration.shoulder, hand)
        if (Math.abs(currentDistance - limbLengths.arm) < 0.5) {
            console.log('adjusted config found')
            return closestConfiguration;
        }

        // Alternate adjustment direction
        adjustmentDirection *= -1;
    }

    // Return last attempt if match not found. Will need to make something better
    console.log('no config found')
    return configurations[configurations.length - 1];
}


