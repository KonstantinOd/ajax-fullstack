import React, { useState } from 'react';
import { useDebouncedValue } from 'rooks';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Filters from './components/Filters';
import StatTable from './components/StatTable';


export enum Modes {
    SensorsStat = 1,
    OperatorsStat = 2
}

const Stat = () => {
    const [filters, setFilters] = useState<any>({});
    const [debouncedFilters] = useDebouncedValue(filters, 1500);
   
    return (
        <Container>
            <Row>
                <Col>
                    <Filters onChangeFilters={setFilters} />
                </Col>
            </Row>
            <Row>
                <Col>
                    <StatTable mode={Modes.SensorsStat} filters={debouncedFilters}/>
                </Col>
            </Row>
            <Row>
                <Col>
                    <StatTable mode={Modes.OperatorsStat} filters={debouncedFilters}/>
                </Col>
            </Row>
        </Container>
    )
}

export default Stat;