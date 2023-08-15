import React, { useState, useEffect } from 'react';

import Table from 'react-bootstrap/Table';
import NestedTable from '../NestedTable';

import { getSensorsStat } from '../../../../api/sensors';
import { getOperatorsStat } from '../../../../api/operators';

import { Modes } from '../..';


interface SensorStat {
    type: string;
    total_success_tests: number;
    total_failure_tests: number;
}

interface OperatorsStat {
    name: string;
    total_success_tests: number;
    total_failure_tests: number;
}

export interface StatTableProps {
    mode: 1 | 2;
    filters: any;
}

const StatTable: React.FC<StatTableProps> = ({ mode, filters }) => {
    const [tBody, setTBody] = useState<(string | number)[][]>([])
    
    const sensorsTHead = ['Sensor Type', 'Total Tests', 'Total Success Tests', 'Total Failure Tests'];
    const operatorsTHead = ['Operator', 'Total Tests', 'Total Success Tests', 'Total Failure Tests'];

    useEffect(() => {
        (async () =>{
            const stat = Modes.SensorsStat === mode 
                ? await getSensorsStat(filters)
                : await getOperatorsStat(filters);

            const parsedTBody = Modes.SensorsStat === mode
                ? parseSensorsStat(stat)
                : parseOperatorsStat(stat);

            setTBody(parsedTBody);
        })()
    }, [filters])

    const parseSensorsStat = (stat: SensorStat[]) => 
        stat.map((sensorStat) =>
            [
                sensorStat.type, 
                sensorStat.total_success_tests + sensorStat.total_failure_tests,
                sensorStat.total_success_tests,
                sensorStat.total_failure_tests
            ]
        );
    
    const parseOperatorsStat = (stat: OperatorsStat[]) => 
        stat.map((operatorStat) =>
            [
                operatorStat.name, 
                operatorStat.total_success_tests + operatorStat.total_failure_tests,
                operatorStat.total_success_tests,
                operatorStat.total_failure_tests
            ]
        );
    
    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            {Modes.SensorsStat === mode
                ? sensorsTHead.map((item, index) => <th key={index}>{item}</th>) 
                : operatorsTHead.map((item, index) => <th key={index}>{item}</th>)
            }
          </tr>
        </thead>
        <tbody>
            {tBody.map((tr, trIndex) => (
                <React.Fragment key={trIndex}>
                    <tr key={trIndex}>
                        {tr.map((td, tdIndex) => <td key={`${trIndex} + ${tdIndex}`}>{td}</td>)}
                    </tr>
                    <tr>
                        <td colSpan={tBody[0].length + 1}>
                            <NestedTable
                                mode={mode}
                                thead={Modes.SensorsStat === mode ? operatorsTHead : sensorsTHead}
                                parseTBody={Modes.SensorsStat === mode ? parseOperatorsStat : parseSensorsStat}
                                filters={
                                    //filter nested table data by sensor type or operator name  
                                    Modes.SensorsStat === mode 
                                        ? {
                                            sensor_type: tr[0]
                                        }
                                        : {
                                            operator: tr[0]
                                        }
                                }
                            />
                        </td>
                    </tr>
            </React.Fragment>
            ))}
        </tbody>
      </Table>
    );
};

export default StatTable;