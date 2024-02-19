import {JSX} from "@babel/types";

export default function Grid({children}){
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
    return         <svg width="400" height="400" viewBox="0 0 400 400">
        {gridLines}
        {children}

    </svg>
}