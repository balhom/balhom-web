import { Search } from "lucide-react";
import "./search-text-input.css";

interface Props {
  text: string;
  onTextChange: (value: string) => void;
  maxLength?: number;
}

const SearchTextInput: React.FC<Props> = ({
  text,
  onTextChange,
  maxLength = 150,
}: Props) => {
  return (
    <div className="search-text-input-wrapper">
      <Search size={20} className="search-text-input-icon" />
      <input
        type="text"
        className="search-text-input"
        value={text}
        onChange={(e) => {
          if (maxLength && e.target.value.length > maxLength) {
            return;
          }
          onTextChange(e.target.value);
        }}
      />
    </div>
  );
};

export default SearchTextInput;
