import React, {useState} from 'react';
import Accordion from 'react-bootstrap/Accordion';

import TableComponent from '../../../Common/Table';
import CustomToggle from '../CustomToggle';

import { getSensorsStat } from '../../../../api/sensors';
import { getOperatorsStat } from '../../../../api/operators';

import { Modes } from '../..';

const NestedTable: React.FC<any> = ({mode, thead, parseTBody, filters}) => {
    const [tbody, setTBody] = useState<any>([])

    const handleChangeToggle = async (isExpanded: boolean) => {
        if (isExpanded && !tbody.length) {
            const stat = Modes.SensorsStat === mode 
            ? await getOperatorsStat(filters)
            : await getSensorsStat(filters);
            const parsedTBody = parseTBody(stat);

            setTBody(parsedTBody);
        }
    }

    return (
        <Accordion defaultActiveKey="1">
            <CustomToggle eventKey="0" onChange={handleChangeToggle} />
            <Accordion.Collapse eventKey="0">
                <TableComponent thead={thead} tbody={tbody} variant={"dark"} />
            </Accordion.Collapse>
        </Accordion>
    )
}

export default NestedTable;