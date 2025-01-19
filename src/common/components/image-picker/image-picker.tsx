import { useState, useRef } from "react";
import { ImagePlusIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import "./image-picker.css";
import AppErrorText from "../app-error-text/app-error-text";
import imageCompression from "browser-image-compression";
import AppLoader from "../../pages/app-loader/app-loader";

interface Props {
  initialImageUrl?: string;
  onImageChange?: (imageFile: File) => void;
}

const ImagePicker = ({ initialImageUrl, onImageChange }: Props) => {
  const { t } = useTranslation();

  const [imageUrl, setImageUrl] = useState(initialImageUrl);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [error, setError] = useState<string>("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);

    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);

      imageCompression(file, {
        maxSizeMB: 0.7,
        useWebWorker: true,
      }).then((compressedImage) => {
        if (compressedImage.size / 1000 > 700) {
          setError(t("common.imageMaxError"));
          return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
          setImageUrl(reader.result as string);
          setIsLoading(false);
        };
        reader.readAsDataURL(compressedImage);
        onImageChange?.(compressedImage);
      });
    }
  };

  return (
    <div className="image-picker">
      {isLoading && (
        <div className="image-picker-preview">
          <AppLoader />
        </div>
      )}

      {!isLoading && (
        <div className="image-picker-preview">
          {imageUrl ? (
            <>
              <img src={imageUrl} />
              <div className="image-picker-preview-overlay">
                <span className="image-picker-preview-text">
                  {t("common.changeImage")}
                </span>
              </div>
            </>
          ) : (
            <div className="image-picker-preview-placeholder">
              <ImagePlusIcon />
              <div>{t("common.selectImage")}</div>
            </div>
          )}
          <input
            ref={fileInputRef}
            type="file"
            className="image-picker-input"
            accept="image/*"
            onChange={handleFileChange}
            aria-label={t("common.selectImage")}
          />
        </div>
      )}

      {!isLoading && <AppErrorText text={error} />}
    </div>
  );
};

export default ImagePicker;
