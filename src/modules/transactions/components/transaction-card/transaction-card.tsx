import "./transaction-card.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2, Eye } from "lucide-react";
import { useTranslation } from "react-i18next";
import { TransactionEntity } from "../../data/entities/transaction-entity";
import AppDeleteDialog from "../../../../common/components/app-delete-dialog/app-delete-dialog";
import { formatTransactionCategory } from "../../utils";
import { formatCurrency } from "../../../currency-profile/utils";
import { TransactionTypeEnum } from "../../data/enums/transaction-type-enum";
import { EXPENSE_ROUTE_PATH, INCOME_ROUTE_PATH } from "../../routes";

interface Props {
  transaction: TransactionEntity;
}

const TransactionCard: React.FC<Props> = ({ transaction }: Props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const formattedDate = new Date(transaction.date).toLocaleDateString();

  const handleDelete = () => {
    // TODO
  };

  return (
    <div className="transaction-card">
      <img
        src={transaction.category.image}
        alt={formatTransactionCategory(transaction.category.code, t)}
        className="transaction-card-category-image"
      />
      <div className="transaction-card-content">
        <h3 className="transaction-card-title">{transaction.title}</h3>
        <div className="transaction-card-amount">
          {formatCurrency(transaction.amount, transaction.currency)}
        </div>
        <div className="transaction-card-date">{formattedDate}</div>
      </div>
      <div className="transaction-card-actions">
        <button
          className="transaction-card-action-button transaction-card-view-button"
          onClick={() =>
            navigate(
              `${
                transaction.type === TransactionTypeEnum.Income
                  ? INCOME_ROUTE_PATH
                  : EXPENSE_ROUTE_PATH
              }/${transaction.id}`
            )
          }
          aria-label={t("transaction.viewTransaction")}
        >
          <Eye size={20} />
        </button>
        <button
          className="transaction-card-action-button transaction-card-delete-button"
          onClick={() => setIsDeleteDialogOpen(true)}
          aria-label={t("transaction.deleteTransaction")}
        >
          <Trash2 size={20} />
        </button>
      </div>

      <AppDeleteDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDelete}
        title={t("transaction.deleteConfirmTitle")}
        message={t("transaction.deleteConfirmMessage", {
          title: transaction.title,
        })}
      />
    </div>
  );
};

export default TransactionCard;
