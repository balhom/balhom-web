import "./document-picker.css";
import { useState, useRef } from "react";
import { Upload, File, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import AppErrorText from "../app-error-text/app-error-text";
import IconButton from "../icon-button/icon-button";
import { DocumentEntity } from "../../data/entities/document-entity";
import { Either } from "../../data/either";

const maxDocumentSize = 5 * 1024 * 1024; // 5MB default

interface Props {
  documents: Either<File, DocumentEntity>[];
  onDocumentsChange: (files: Either<File, DocumentEntity>[]) => void;
  maxSize?: number; // in bytes
  maxDocuments?: number;
  accept?: string;
}

const DocumentPicker: React.FC<Props> = ({
  documents,
  onDocumentsChange,
  maxSize = maxDocumentSize,
  maxDocuments = 3,
  accept = ".pdf,.doc,.docx,.png,.jpg,.jpeg",
}: Props) => {
  const { t } = useTranslation();

  const [isDragging, setIsDragging] = useState(false);

  const [errorText, setErrorText] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const handleFiles = (newFiles: FileList | null) => {
    if (!newFiles) return;

    setErrorText("");

    const updatedFiles = [...documents];
    let errorMessage = null;

    Array.from(newFiles).forEach((file) => {
      if (updatedFiles.length >= maxDocuments) {
        errorMessage = t("common.maxFilesExceededError");
        return;
      }

      if (file.size > maxSize) {
        errorMessage = t("common.fileTooLargeError", {
          maxSize: formatFileSize(maxSize),
        });
        return;
      }

      if (
        !updatedFiles.find(
          (docEither) =>
            docEither.isLeft() && docEither.getLeft()?.name === file.name
        )
      ) {
        updatedFiles.push(Either.left(file));
      }
    });

    if (errorMessage) {
      setErrorText(errorMessage);
    }

    onDocumentsChange(updatedFiles);
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
    const updatedFiles = documents.filter((_, i) => i !== index);
    onDocumentsChange([...updatedFiles]);
  };

  return (
    <div className="document-picker">
      <div
        className={`document-picker-dropzone ${isDragging ? "dragging" : ""}`}
        onClick={() => fileInputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <Upload size={32} className="document-picker-dropzone-icon" />

        <div className="document-picker-dropzone-text">
          {t("common.dropzoneText")}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          onChange={(e) => handleFiles(e.target.files)}
          style={{ display: "none" }}
          multiple
          accept={accept}
        />
      </div>

      <AppErrorText text={errorText} />

      {documents.length > 0 && (
        <div className="file-list">
          {documents.map((documentEither, index) => {
            let docName = "";
            let docSize: number | undefined;

            documentEither.fold(
              (file) => {
                docName = file.name;
                docSize = file.size;
              },
              (documentEntity) => {
                docName = documentEntity.name;
              }
            );
            return (
              <div key={`${docName}-${index}`} className="file-item">
                <File size={20} className="file-icon" />

                <div className="file-info">
                  <div className="file-name">{docName}</div>

                  {docSize && (
                    <div className="file-size">{formatFileSize(docSize)}</div>
                  )}
                </div>

                <IconButton
                  icon={<X size={20} />}
                  onClick={() => removeFile(index)}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DocumentPicker;
