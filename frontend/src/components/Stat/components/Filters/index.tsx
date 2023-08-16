import React from 'react';

import DateRange from '../../../Common/DateRange';

import { getDifferenceInDays } from '../../../../helpers/dates';

interface FiltersProps {
    onChangeFilters: (filters: any) => void;
}

const Filters: React.FC<FiltersProps> = ({onChangeFilters}) => {

    const handleChangeDateRange = (start: Date | null, end: Date | null) => {
        if (start && end && start <= end) {
            // Calculate the difference in days
            const differenceInDays = getDifferenceInDays(end, start);
      
            // Update filters only if the date range is less than or equal to 2 weeks
            if (differenceInDays <= 14) {
                onChangeFilters((prevFilters: any) => ({
                    ...prevFilters,
                    start_date: start.toISOString(),
                    end_date: end.toISOString(),
                  }));
            } 
        }
    }

    return (
        <div className='mt-2'>
            <p className='m-1'>Select date range to filter statistics (max date range = 2 weeks)</p>
            <div className='d-flex flex-row mt-1'>
                <DateRange onSelectRange={handleChangeDateRange} maxRange={14}/>
            </div>
        </div>
    )
}

export default Filters;