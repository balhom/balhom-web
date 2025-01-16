import { useState, useRef } from 'react';
import { Upload, File, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import './file-upload.css';

interface FileWithPreview extends File {
  preview?: string;
}

interface FileUploadProps {
  onChange: (files: File[]) => void;
  maxSize?: number; // in bytes
  maxFiles?: number;
  accept?: string;
}

const FileUpload = ({
  onChange,
  maxSize = 5 * 1024 * 1024, // 5MB default
  maxFiles = 5,
  accept = '*/*'
}: FileUploadProps) => {
  const { t } = useTranslation();
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (newFiles: FileList | null) => {
    if (!newFiles) return;

    setError(null);

    const updatedFiles = [...files];
    let errorMessage = null;

    Array.from(newFiles).forEach(file => {
      if (updatedFiles.length >= maxFiles) {
        errorMessage = t('common.maxFilesExceeded', { count: maxFiles });
        return;
      }

      if (file.size > maxSize) {
        errorMessage = t('common.fileTooLarge', { 
          fileName: file.name, 
          maxSize: Math.round(maxSize / 1024 / 1024) 
        });
        return;
      }

      if (!updatedFiles.find(f => f.name === file.name)) {
        updatedFiles.push(file);
      }
    });

    if (errorMessage) {
      setError(errorMessage);
    }

    setFiles(updatedFiles);
    onChange(updatedFiles);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const removeFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    onChange(updatedFiles);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="file-upload">
      <div
        className={`dropzone ${isDragging ? 'dragging' : ''}`}
        onClick={() => fileInputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <Upload size={32} className="dropzone-icon" />
        <div className="dropzone-text">{t('income.dropzoneText')}</div>
        <input
          ref={fileInputRef}
          type="file"
          onChange={(e) => handleFiles(e.target.files)}
          style={{ display: 'none' }}
          multiple
          accept={accept}
        />
      </div>

      {error && <div className="file-error">{error}</div>}

      {files.length > 0 && (
        <div className="file-list">
          {files.map((file, index) => (
            <div key={`${file.name}-${index}`} className="file-item">
              <File size={20} className="file-icon" />
              <div className="file-info">
                <div className="file-name">{file.name}</div>
                <div className="file-size">{formatFileSize(file.size)}</div>
              </div>
              <button
                type="button"
                className="file-remove"
                onClick={() => removeFile(index)}
                aria-label={t('common.remove')}
              >
                <X size={20} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUpload;