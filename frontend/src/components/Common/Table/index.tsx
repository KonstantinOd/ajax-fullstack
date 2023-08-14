import React from 'react';
import Table from 'react-bootstrap/Table';


interface TableProps {
    thead: string[];
    tbody: (string | number)[][];
    variant?: string
}

const TableComponent: React.FC<TableProps> = ({ thead, tbody, variant }) => {
    return (
      <Table striped bordered hover variant={variant}>
        <thead>
          <tr>
            {thead.map((item, index) => <th key={index}>{item}</th>)}
          </tr>
        </thead>
        <tbody>
          {tbody.map((tr, trIndex) => (
            <tr key={trIndex}>
                {tr.map((td, tdIndex) => <td key={`${trIndex} + ${tdIndex}`}>{td}</td>)}
            </tr>
          ))}
        </tbody>
      </Table>
    );
};

export default TableComponent;