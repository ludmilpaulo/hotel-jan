declare module 'react-date-range' {
  import { Component } from 'react';

  export interface Range {
    startDate: Date;
    endDate: Date;
    key: string;
  }

  export interface DateRangeProps {
    ranges: Range[];
    onChange: (item: { selection: Range }) => void;
    minDate?: Date;
    maxDate?: Date;
    editableDateInputs?: boolean;
    moveRangeOnFirstSelection?: boolean;
    rangeColors?: string[];
    className?: string;
    disabledDates?: Date[];
  }

  export class DateRange extends Component<DateRangeProps> {}
}

