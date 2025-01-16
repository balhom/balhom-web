import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import ImageIcon from '../../icons/image-icon';
import './image-picker.css';

interface ImagePickerProps {
  value: string;
  onChange: (value: string) => void;
}

const ImagePicker = ({ value, onChange }: ImagePickerProps) => {
  const { t } = useTranslation();
  const [error, setError] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageError = () => {
    setError(true);
    onChange('');
  };

  const handleImageLoad = () => {
    setError(false);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="form-group">
      <label>{t('auth.profileImage')}</label>
      <div className="image-picker">
        <div 
          className="image-preview"
          onClick={() => fileInputRef.current?.click()}
        >
          {value && !error ? (
            <>
              <img 
                src={value} 
                alt={t('auth.profileImage')}
                onError={handleImageError}
                onLoad={handleImageLoad}
              />
              <div className="image-preview-overlay">
                <span className="image-preview-text">
                  {t('auth.changeImage')}
                </span>
              </div>
            </>
          ) : (
            <div className="image-preview-placeholder">
              <ImageIcon />
              <div>{t('auth.selectImage')}</div>
            </div>
          )}
          <input
            ref={fileInputRef}
            type="file"
            className="image-input"
            accept="image/*"
            onChange={handleFileChange}
            aria-label={t('auth.selectImage')}
          />
        </div>
      </div>
    </div>
  );
};

export default ImagePicker;