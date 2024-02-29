import { calculateJointPositionsFromAngles, findOptimalConfiguration, calculateShoulderPosition, calculateDistance, foot, hand } from "../utils";

describe('calculateJointPositionsFromAngles', () => {
    it('calculates correct joint positions for given angles and limb lengths', () => {
        const angles = { shoulder: 0, hip: Math.PI / 4, knee: Math.PI / 4, ankle: 0 };
        const limbLengths = { lowerLeg: 10, upperLeg: 10, torso: 15, arm: 10 };
        const {lowerLeg, upperLeg} = limbLengths

        const result = calculateJointPositionsFromAngles(angles, limbLengths);

        expect(result.ankle).toStrictEqual(foot)

        expect(result.knee.x).toBeCloseTo(foot.x, 3); // Example assertion
        expect(result.knee.y).toBeCloseTo(foot.y - lowerLeg, 2)

        //shoulder position already tested in other test
    });
});

describe('findOptimalConfiguration', () => {
    it('returns the correct configuration when there is one', () => {

    });
    //test for adjusting rules when it doesnt find a working configuration
    it('', () => {

    });
    //something for when it is still not possible
    it('', () => {

    });
})

describe('calculateDistance', () => {
    const start = { x: 0, y: 0 };
    let end = { x: 4, y: 4 };
    it('correctly finds the distance between 2 points', () => {
        const canReach = calculateDistance(start, end);
        expect(canReach).toBeCloseTo(5.656);
    });
});

describe('calculateShoulderPosition', () => {
    it('calculates the correct shoulder Y position given hip and target X', () => {
        const hipPosition = { x: 0, y: 0 };
        const targetShoulderX = 5;
        const torsoLength = 8
// calculation for finding torsoLength using Pythagorean theorem would be torsoLength = the square root of the sum of (targetShoulderX - hipPosition.x)**2 and (y - hipPosition.y)**2
// to solve for y, we instead have to do below (subtracting the square root instead of addind due to how it is plotted on our graph
       // y = hipPosition.y-Math.sqrt(torsoLength**2 - (targetShoulderX - hipPosition.x)**2)

       // this is what y should equal when those specific values assigned to the variables are run through above equation
        let y = -6.244997998398398
        const shoulderY = calculateShoulderPosition(hipPosition, targetShoulderX, torsoLength);
        expect(shoulderY).toBeCloseTo(y, 3);
    });
})
