import { useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import { X } from 'lucide-react';
import 'react-datepicker/dist/react-datepicker.css';
import './date-picker.css';

interface DatePickerDialogProps {
  isOpen: boolean;
  onClose: () => void;
  selected: Date | null;
  onChange: (date: Date | null) => void;
  title: string;
  minDate?: Date;
  maxDate?: Date;
}

const DatePickerDialog = ({
  isOpen,
  onClose,
  selected,
  onChange,
  title,
  minDate,
  maxDate
}: DatePickerDialogProps) => {
  const [tempDate, setTempDate] = useState<Date | null>(selected);

  if (!isOpen) return null;

  const handleApply = () => {
    onChange(tempDate);
    onClose();
  };

  const handleCancel = () => {
    setTempDate(selected);
    onClose();
  };

  return (
    <div className="date-picker-dialog-overlay" onClick={handleCancel}>
      <div className="date-picker-dialog" onClick={e => e.stopPropagation()}>
        <div className="date-picker-header">
          <h2 className="date-picker-title">{title}</h2>
          <button className="close-button" onClick={handleCancel}>
            <X size={20} />
          </button>
        </div>
        <div className="date-picker-content">
          <ReactDatePicker
            selected={tempDate}
            onChange={setTempDate}
            inline
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            minDate={minDate}
            maxDate={maxDate}
          />
        </div>
        <div className="date-picker-actions">
          <button className="date-picker-button cancel" onClick={handleCancel}>
            Cancel
          </button>
          <button className="date-picker-button apply" onClick={handleApply}>
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default DatePickerDialog;