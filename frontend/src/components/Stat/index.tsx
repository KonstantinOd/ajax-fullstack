import React, { useEffect, useState } from 'react';
import StatTable from './components/StatTable';


export enum Modes {
    SensorsStat = 1,
    OperatorsStat = 2
}

const Stat = () => {
   
    return (
        <>
            <StatTable
                mode={Modes.SensorsStat}
            />
            <StatTable
                mode={Modes.OperatorsStat}
            />
        </>
    )
}

export default Stat;