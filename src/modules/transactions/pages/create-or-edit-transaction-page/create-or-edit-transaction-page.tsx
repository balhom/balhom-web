import "./create-or-edit-transaction-page.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowLeft } from "lucide-react";
import { TransactionTypeEnum } from "../../data/enums/transaction-type-enum";
import { useCurrencyProfiles } from "../../../currency-profile/states/contexts/currency-profiles-context";
import { EXPENSE_ROUTE_PATH, INCOME_ROUTE_PATH } from "../../routes";
import IconButton from "../../../../common/components/icon-button/icon-button";
import AppTextInput from "../../../../common/components/app-text-input/app-text-input";
import { useTransactionForm } from "../../hooks/use-transaction-form";
import AppNumberInput from "../../../../common/components/app-number-input/app-number-input";
import AppTextArea from "../../../../common/components/app-text-area/app-text-area";
import { TransactionCategoryEnum } from "../../data/enums/transaction-category-enum";
import DateTimePicker from "../../../../common/components/date-time-picker/date-time-picker";
import TransactionCategoryPicker from "../../components/transaction-category-picker/transaction-category-picker";
import AppFormButton from "../../../../common/components/app-form-button/app-form-button";
import DocumentPicker from "../../../../common/components/document-picker/document-picker";
import { TransactionEntity } from "../../data/entities/transaction-entity";
import { getTransaction } from "../../usecases/get-transaction-usecase";
import AppLoaderPage from "../../../../common/pages/app-loader-page/app-loader-page";
import { DocumentEntity } from "../../../../common/data/entities/document-entity";
import { updateTransaction } from "../../usecases/update-transaction-usecase";
import { createTransaction } from "../../usecases/create-transaction-usecase";

interface Props {
  transactionType: TransactionTypeEnum;
}

const CreateOrEditTransactionPage: React.FC<Props> = ({ transactionType }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { id } = useParams();

  const isEditPage = id !== undefined;

  const { selectedCurrencyProfile } = useCurrencyProfiles();

  const [transactionState, setTransactionState] = useState<
    TransactionEntity | undefined
  >();

  // Form hooks
  const [
    title,
    description,
    titleError,
    descriptionError,
    handleTitleChange,
    handleDescriptionChange,
    isFormValid,
  ] = useTransactionForm();
  const [amount, setAmount] = useState("0");
  const [category, setCategory] = useState<TransactionCategoryEnum>(
    transactionType === TransactionTypeEnum.Income
      ? TransactionCategoryEnum.IncomeSalary
      : TransactionCategoryEnum.ExpenseBills
  );
  const [date, setDate] = useState<Date>(new Date());
  const [documents, setDocuments] = useState<(File | DocumentEntity)[]>([]);

  useEffect(() => {
    if (id && selectedCurrencyProfile) {
      getTransaction(id, transactionType, selectedCurrencyProfile).then(
        (transactionEither) => {
          transactionEither.fold(
            () => {},
            (transaction) => {
              setTransactionState(transaction);

              // Set form
              handleTitleChange(transaction.title);
              handleDescriptionChange(transaction.description);
              setAmount(transaction.amount.toString());
              setCategory(transaction.category.code);
              setDate(transaction.date);
              setDocuments(transaction.documents);
            }
          );
        }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!selectedCurrencyProfile) return null;

  if (!transactionState && isEditPage) {
    return <AppLoaderPage />;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid()) {
      return;
    }

    const documentsToRemove: DocumentEntity[] = [];
    const documentsToUpload: File[] = [];

    const oldDocuments = [...(transactionState?.documents ?? [])];
    const newDocuments = [...documents];

    oldDocuments.forEach((oldDoc) => {
      // If new documents does not contain old document
      // then it should be removed
      if (
        !newDocuments.find(
          (newFileOrDoc) =>
            !(newFileOrDoc instanceof File) && newFileOrDoc.id === oldDoc.id
        )
      ) {
        documentsToRemove.push(oldDoc);
      }
    });

    newDocuments.forEach((newFileOrDoc) => {
      // If new document is a file then it should be uploaded
      if (newFileOrDoc instanceof File) {
        documentsToUpload.push(newFileOrDoc);
      }
    });

    if (isEditPage) {
      updateTransaction({
        id: id,
        type: transactionType,
        title: title,
        description: description,
        amount: Number(amount),
        date: date,
        category: category,
        documentsToRemove: documentsToRemove,
        documentsToUpload: documentsToUpload,
      });
    } else {
      createTransaction({
        type: transactionType,
        title: title,
        description: description,
        amount: Number(amount),
        date: date,
        category: category,
        documents: documentsToUpload,
      });
    }

    navigate(
      transactionType === TransactionTypeEnum.Income
        ? INCOME_ROUTE_PATH
        : EXPENSE_ROUTE_PATH
    );
  };

  let pageTitle = "";
  if (!isEditPage) {
    pageTitle =
      transactionType === TransactionTypeEnum.Income
        ? t("transaction.createIncomeTitle")
        : t("transaction.createExpenseTitle");
  } else {
    pageTitle =
      transactionType === TransactionTypeEnum.Income
        ? t("transaction.editIncomeTitle")
        : t("transaction.editExpenseTitle");
  }

  let pageSubtitle = "";
  if (!isEditPage) {
    pageSubtitle =
      transactionType === TransactionTypeEnum.Income
        ? t("transaction.createIncomeDescription")
        : t("transaction.createExpenseDescription");
  }

  return (
    <div className="create-or-edit-transaction-page">
      {/* Header Part */}
      <div className="create-or-edit-transaction-page-header">
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
      </div>

      <div className="create-or-edit-transaction-page-card">
        {/* Page title Part */}
        <div className="create-or-edit-transaction-page-title-header">
          <h1 className="create-or-edit-transaction-page-title">{pageTitle}</h1>

          <p className="create-or-edit-transaction-page-subtitle">
            {pageSubtitle}
          </p>
        </div>

        {/* Form Part */}
        <form
          className="create-or-edit-transaction-page-form"
          onSubmit={handleSubmit}
        >
          {/* Title Part */}
          <div>
            <div className="create-or-edit-transaction-page-form-label">
              {t("transaction.title")}
            </div>

            <AppTextInput
              id="transaction-title"
              text={title}
              onTextChange={handleTitleChange}
              errorText={titleError}
              maxLength={30}
            />
          </div>

          {/* Description Part */}
          <div>
            <div className="create-or-edit-transaction-page-form-label">
              {t("transaction.description")}
            </div>

            <AppTextArea
              id="transaction-description"
              text={description}
              onTextChange={handleDescriptionChange}
              errorText={descriptionError}
              maxLength={200}
              rows={4}
            />
          </div>

          {/* Amount Part */}
          <div>
            <div className="create-or-edit-transaction-page-form-label">
              {t("transaction.amount")}
            </div>

            <AppNumberInput
              id="transaction-amount"
              value={amount}
              onChange={setAmount}
              min={0}
              max={100000000}
            />
          </div>

          {/* Category Part */}
          <div>
            <div className="create-or-edit-transaction-page-form-label">
              {t("transaction.category")}
            </div>

            <TransactionCategoryPicker
              type={transactionType}
              value={category}
              onChange={setCategory}
            />
          </div>

          {/* Date Part */}
          <div>
            <div className="create-or-edit-transaction-page-form-label">
              {t("transaction.date")}
            </div>

            <DateTimePicker
              initialDate={date}
              onChange={(newDate) => setDate(newDate ?? new Date())}
              showTime={true}
            />
          </div>

          {/* Documents Part */}
          <div>
            <div className="create-or-edit-transaction-page-form-label">
              {t("transaction.attachments")}
            </div>

            <DocumentPicker
              documents={documents}
              onDocumentsChange={setDocuments}
            />
          </div>

          <AppFormButton text={t("common.confirm")} />
        </form>
      </div>
    </div>
  );
};

export default CreateOrEditTransactionPage;
