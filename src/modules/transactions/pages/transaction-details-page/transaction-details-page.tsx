import "./transaction-details-page.css";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowLeft, FileText, Download, Pencil } from "lucide-react";
import { formatCurrency } from "../../../currency-profile/utils";
import { useCurrencyProfiles } from "../../../currency-profile/states/contexts/currency-profiles-context";
import { useEffect, useRef, useState } from "react";
import { TransactionEntity } from "../../data/entities/transaction-entity";
import { getTransaction } from "../../usecases/get-transaction-usecase";
import { TransactionTypeEnum } from "../../data/enums/transaction-type-enum";
import AppLoaderPage from "../../../../common/pages/app-loader-page/app-loader-page";
import { formatTransactionCategory } from "../../utils";
import {
  EXPENSE_EDIT_ROUTE_PATH,
  EXPENSE_ROUTE_PATH,
  INCOME_EDIT_ROUTE_PATH,
  INCOME_ROUTE_PATH,
} from "../../routes";
import IconButton from "../../../../common/components/icon-button/icon-button";
import { formatDate } from "../../../../common/utils/date-utils";
import { getTransactionDocumentUrl } from "../../usecases/get-transaction-ducment-url-usecase";

interface Props {
  transactionType: TransactionTypeEnum;
}

const TransactionDetailsPage: React.FC<Props> = ({
  transactionType,
}: Props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { id } = useParams();

  const { selectedCurrencyProfile } = useCurrencyProfiles();

  const [transactionState, setTransactionState] = useState<
    TransactionEntity | undefined
  >();

  const selectedCurrencyProfileRef = useRef(selectedCurrencyProfile);

  useEffect(() => {
    console.log("hola");
    if (id && selectedCurrencyProfileRef.current) {
      getTransaction(
        id,
        transactionType,
        selectedCurrencyProfileRef.current
      ).then((transactionEither) => {
        transactionEither.fold(
          () => {},
          (transaction) => {
            setTransactionState(transaction);
          }
        );
      });
    }
  }, [id, transactionType, selectedCurrencyProfileRef]);

  if (!transactionState || !selectedCurrencyProfile || !id) {
    return <AppLoaderPage />;
  }

  const formattedDate = formatDate(transactionState.date, true);

  const handleEdit = () => {
    navigate(
      (transactionType === TransactionTypeEnum.Income
        ? INCOME_EDIT_ROUTE_PATH
        : EXPENSE_EDIT_ROUTE_PATH) +
        "/" +
        transactionState.id
    );
  };

  return (
    <div className="transaction-details-page">
      <div className="transaction-details-page-header">
        <IconButton
          icon={<ArrowLeft size={20} />}
          onClick={() =>
            navigate(
              transactionType === TransactionTypeEnum.Income
                ? INCOME_ROUTE_PATH
                : EXPENSE_ROUTE_PATH
            )
          }
        />
        <IconButton icon={<Pencil size={20} />} onClick={handleEdit} />
      </div>

      <div className="transaction-details-page-card">
        <div className="transaction-details-page-title-amount">
          <h1 className="transaction-details-page-title">
            {transactionState.title}
          </h1>
          <div
            className={`transaction-details-page-amount ${transactionType.toLowerCase()}-color`}
          >
            {formatCurrency(
              transactionState.amount,
              selectedCurrencyProfile.currency
            )}
          </div>
        </div>

        <div className="transaction-details-page-info">
          <div className="transaction-details-page-info-group">
            <div className="transaction-details-page-info-label">
              {t("transaction.category")}
            </div>

            <div className="transaction-details-page-category-info">
              <img
                src={transactionState.category.image}
                alt={formatTransactionCategory(
                  transactionState.category.code,
                  t
                )}
                className="transaction-details-page-category-image"
              />
              <span className="transaction-details-page-category-name">
                {formatTransactionCategory(transactionState.category.code, t)}
              </span>
            </div>
          </div>

          <div className="transaction-details-page-info-group">
            <div className="transaction-details-page-info-label">
              {t("transaction.date")}
            </div>

            <div className="transaction-details-page-info-value">
              {formattedDate}
            </div>
          </div>

          <div className="transaction-details-page-info-group">
            <div className="transaction-details-page-info-label">
              {t("transaction.description")}
            </div>

            <div className="transaction-details-page-info-value">
              {transactionState.description}
            </div>
          </div>

          <div className="transaction-details-page-info-group">
            <div className="transaction-details-page-info-label">
              {t("transaction.attachments")}
            </div>

            <div className="transaction-details-page-attachments-list">
              {transactionState.documents.map((doc) => (
                <div
                  key={doc.id}
                  className="transaction-details-page-attachment-item"
                  onClick={() => {
                    getTransactionDocumentUrl(transactionState.id, doc.id).then(
                      (res) => {
                        res.fold(
                          () => undefined,
                          (url) => window.open(url)
                        );
                      }
                    );
                  }}
                >
                  <FileText
                    size={24}
                    className="transaction-details-page-attachment-icon"
                  />

                  <div className="transaction-details-page-attachment-info">
                    <div className="transaction-details-page-attachment-name">
                      {doc.name}
                    </div>

                    {doc.createdAt && (
                      <div className="transaction-details-page-attachment-meta">
                        {new Date(doc.createdAt).toLocaleDateString()}
                      </div>
                    )}
                  </div>

                  <Download
                    size={20}
                    className="transaction-details-page-attachment-icon"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetailsPage;
