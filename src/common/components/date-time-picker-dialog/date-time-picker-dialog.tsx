import './date-time-picker-dialog.css';
import { useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import { X } from 'lucide-react';
import 'react-datepicker/dist/react-datepicker.css';
import { useTranslation } from "react-i18next";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  selected: Date | null;
  onChange: (date: Date | null) => void;
  title: string;
  showTime?: boolean;
  minDate?: Date;
  maxDate?: Date;
}

const DateTimePickerDialog: React.FC<Props> = ({
  isOpen,
  onClose,
  selected,
  onChange,
  title,
  showTime = true,
  minDate,
  maxDate
}: Props) => {
  const { t, i18n } = useTranslation();

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
    <div className="date-time-picker-dialog-overlay" onClick={handleCancel}>
      <div className="date-time-picker-dialog" onClick={e => e.stopPropagation()}>
        <div className="date-time-picker-dialog-header">
          <h2 className="date-time-picker-dialog-title">{title}</h2>
          <button className="date-time-picker-dialog-close-button" onClick={handleCancel}>
            <X size={20} />
          </button>
        </div>
        <div className="date-time-picker-dialog-content">
          <ReactDatePicker
            locale={i18n.language}
            selected={tempDate}
            onChange={setTempDate}
            inline={true}
            showTimeSelect={showTime}
            timeFormat="HH:mm"
            timeIntervals={15}
            minDate={minDate}
            maxDate={maxDate}
          />
        </div>
        <div className="date-time-picker-dialog-actions">
          <button className="date-time-picker-dialog-button apply" onClick={handleApply}>
            {t("common.apply")}
          </button>
          <button className="date-time-picker-dialog-button cancel" onClick={handleCancel}>
            {t("common.cancel")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DateTimePickerDialog;
