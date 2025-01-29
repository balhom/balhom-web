import './date-time-picker.css';
import { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { formatDate } from '../../utils/date-utils';
import { Calendar } from 'lucide-react';
import DateTimePickerDialog from '../date-time-picker-dialog/date-time-picker-dialog';

interface Props {
  initialDate: Date;
  onChange: (date: Date | null) => void;
  showTime?: boolean;
}

const DateTimePicker: React.FC<Props> = ({
  initialDate,
  onChange,
  showTime = true,
}: Props) => {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  if (!showTime) {
    initialDate.setUTCHours(0);
    initialDate.setUTCMinutes(0);
    initialDate.setUTCSeconds(0);
    initialDate.setUTCMilliseconds(0);
  }
  return (
    <>
      <div
        className="date-time-picker-input"
        onClick={() => setIsDatePickerOpen(true)}
        role="button"
        tabIndex={0}
      >
        <Calendar size={20} color="#64748b" />
        <span
          className="date-time-picker-value"
        >
          {formatDate(initialDate, showTime)}
        </span>
      </div>
      <DateTimePickerDialog
        isOpen={isDatePickerOpen}
        onClose={() => setIsDatePickerOpen(false)}
        selected={new Date()}
        onChange={onChange}
        title=""
        showTime={showTime}
        maxDate={new Date()}
      />
    </>
  );
};

export default DateTimePicker;
