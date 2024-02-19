const MomentArm = ({ startX, endX, ankle }) => {
    const distance = Math.abs(endX - startX); // Calculate the absolute distance to ensure a positive value
    const minY = ankle.y + 10; // Minimum Y position for the line to start
    const textY = minY + 20; // Y position for the text, placed below the line

    return (
        <>
            {/* Render the line */}
            <line
                x1={startX}
                y1={minY}
                x2={endX}
                y2={minY}
                stroke="red"
                strokeWidth="2"
            />
            {/* Render the distance text */}
            <text
                x={(startX + endX) / 2}
                y={textY}
                fill="white"
                textAnchor="middle"
                fontSize="12"
            >
                {distance}px
            </text>
    </>
    );
};

export default MomentArm;
