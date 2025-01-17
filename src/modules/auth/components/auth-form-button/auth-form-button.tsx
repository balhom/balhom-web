import "./auth-form-button.css";

interface Props {
  text: string;
}

const AuthFormButton = ({ text }: Props) => {
  return (
    <button type="submit" className="auth-form-button">
      {text}
    </button>
  );
};

export default AuthFormButton;
