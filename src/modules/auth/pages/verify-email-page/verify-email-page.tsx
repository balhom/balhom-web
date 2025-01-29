import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import "./verify-email-page.css";
import FormContainer from "../../../../common/components/form-container/form-container";
import { LOGIN_ROUTE_PATH } from "../../routes";

const VerifyEmailPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <FormContainer>
      <div className="verify-email-page-header">
        <h1>{t("auth.verifyEmailTitle")}</h1>
        <p>{t("auth.verificationSent")}</p>
      </div>
      <div className="verify-email-page-instructions">
        <p>{t("auth.checkInbox")}</p>
        <p className="verify-email-page-spam-notice">{t("auth.checkSpam")}</p>
      </div>
      <div className="verify-email-page-footer">
        <Link to={LOGIN_ROUTE_PATH}>{t("auth.backToSignInRedirect")}</Link>
      </div>
    </FormContainer>
  );
};

export default VerifyEmailPage;
