import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';

import { getDifferenceInDays } from '../../../helpers/dates';

import 'react-datepicker/dist/react-datepicker.css';

interface DateRangePickerProps {
  onSelectRange: (startDate: Date | null, endDate: Date | null) => void;
  maxRange?: number; // maxRange in days
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({ onSelectRange, maxRange }) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);

    // Check if the date range is within maxRange
    if (maxRange && start && end) {
      const rangeInDays = getDifferenceInDays(start, end);
      if (rangeInDays > maxRange) {
        // Reset the end date to enforce the maxRange limit
        setEndDate(new Date(start.getTime() + maxRange * 24 * 60 * 60 * 1000));
      }
    }
  };

  useEffect(() => onSelectRange(startDate, endDate), [startDate, endDate]) 

  return (
    <>
      <DatePicker
        showTimeSelect
        selected={startDate}
        onChange={(date) => handleDateChange([date, endDate])}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        dateFormat="dd/MM/yyyy"
        className='m-1'
      />
      <DatePicker
        showTimeSelect
        selected={endDate}
        onChange={(date) => handleDateChange([startDate, date])}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
        dateFormat="dd/MM/yyyy"
        className='m-1'
      />
    </>
  );
};

export default DateRangePicker;