'use client'

import { useState, useEffect } from 'react';
import Figure from '../components/Figure';
import {findOptimalConfiguration} from "@/lib/utils";
const Home = () => {
  const [ankleP, setAnkleP] = useState({x: 0, y: 0})
  const [handP, setHandP] = useState({x: 0, y: 0})
  const [kneeP, setKneeP] = useState({x: 0, y: 0})
  const [hipP, setHipP] = useState({x: 0, y: 0})
  const [shoulderP, setShoulderP] = useState({x: 0, y: 0})
  const [configurations, setConfig] = useState([{shoulder: {x: 0, y: 0}, ankle: {x: 0, y: 0}, hand:{x: 0, y: 0}, hip:{x: 0, y: 0}, knee:{x: 0, y: 0},}])
  useEffect(() => {
    let { JOINTS, configurations } = findOptimalConfiguration({lowerLeg:50, upperLeg: 50, torso: 100, arm: 80})
    let {knee, hip, ankle, shoulder, hand} = JOINTS
    setHipP(hip)
    setAnkleP(ankle)
    setShoulderP(shoulder)
    setKneeP(knee)
    setHandP(hand)
    setConfig(configurations)
  }, []);

  if(configurations.length < 1)
    return null
  else
    return (
        <div>
          <Figure configurations={configurations}/>
        </div>
    );
};
export default Home;
