'use client'

import { useState, useEffect } from 'react';
import Grid from '../components/Grid'
import Figure from '../components/Figure';
import MomentArm from '../components/MomentArm'
import {findOptimalConfiguration} from "@/lib/utils";
const Home = () => {
  const [configuration, setConfig] = useState({shoulder: {x: 0, y: 0}, neck: {x: 0, y: 0}, ankle: {x: 0, y: 0}, hand:{x: 0, y: 0}, hip:{x: 0, y: 0}, knee:{x: 0, y: 0},})
  useEffect(() => {
    let JOINTS = findOptimalConfiguration({lowerLeg:30, upperLeg: 35, torso: 43, arm: 40})
    //let {knee, hip, ankle, shoulder, hand} = JOINTS
    setConfig(JOINTS)

  }, []);


  const { ankle, knee, hip, shoulder, neck, hand } = configuration;
  //
  // if()
  //   return null
  // else
    return (
        <Grid>
          <Figure ankle={ankle} shoulder={shoulder} neck={neck} hand={hand} hip={hip} knee={knee} torsoLength={0}/>
          <MomentArm endX={hand.x} startX={hip.x} ankle={ankle}></MomentArm>
        </Grid>
    );
};
export default Home;
