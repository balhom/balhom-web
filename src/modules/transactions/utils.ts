import { TFunction } from "i18next";
import { TransactionCategoryEnum } from "./data/enums/transaction-category-enum";

export function formatTransactionCategory(
  category: TransactionCategoryEnum,
  t: TFunction<"translation", undefined>
): string {
  switch (category) {
    case TransactionCategoryEnum.IncomeSalary:
      return t("transaction.categoryOptions.salary");
    case TransactionCategoryEnum.IncomeBizum:
    case TransactionCategoryEnum.ExpenseBizum:
      return t("transaction.categoryOptions.bizum");
    case TransactionCategoryEnum.IncomeTransfer:
    case TransactionCategoryEnum.ExpenseTransfer:
      return t("transaction.categoryOptions.transfer");
    case TransactionCategoryEnum.IncomeInvestments:
    case TransactionCategoryEnum.ExpenseInvestments:
      return t("transaction.categoryOptions.investments");
    case TransactionCategoryEnum.IncomeBusiness:
      return t("transaction.categoryOptions.business");
    case TransactionCategoryEnum.IncomeGift:
      return t("transaction.categoryOptions.gift");
    case TransactionCategoryEnum.IncomeDeposit:
      return t("transaction.categoryOptions.deposit");
    case TransactionCategoryEnum.IncomeSales:
      return t("transaction.categoryOptions.sales");
    case TransactionCategoryEnum.ExpenseHousing:
      return t("transaction.categoryOptions.housing");
    case TransactionCategoryEnum.ExpenseTransportation:
      return t("transaction.categoryOptions.transportation");
    case TransactionCategoryEnum.ExpenseFood:
      return t("transaction.categoryOptions.food");
    case TransactionCategoryEnum.ExpenseHealth:
      return t("transaction.categoryOptions.health");
    case TransactionCategoryEnum.ExpenseDebt:
      return t("transaction.categoryOptions.debt");
    case TransactionCategoryEnum.ExpenseFamily:
      return t("transaction.categoryOptions.family");
    case TransactionCategoryEnum.ExpenseLeisure:
      return t("transaction.categoryOptions.leisure");
    case TransactionCategoryEnum.ExpenseVacations:
      return t("transaction.categoryOptions.vacations");
    case TransactionCategoryEnum.ExpenseInsurance:
      return t("transaction.categoryOptions.insurance");
    case TransactionCategoryEnum.ExpenseTaxes:
      return t("transaction.categoryOptions.taxes");
    case TransactionCategoryEnum.ExpenseBills:
      return t("transaction.categoryOptions.bills");
    case TransactionCategoryEnum.ExpenseShopping:
      return t("transaction.categoryOptions.shopping");
    default:
      return t("transaction.categoryOptions.other");
  }
}

export function categoryToImage(category: TransactionCategoryEnum): string {
  switch (category) {
    case TransactionCategoryEnum.IncomeSalary:
      return "/income/salary-category-icon.webp";
    case TransactionCategoryEnum.IncomeBizum:
      return "/income/bizum-category-icon.webp";
    case TransactionCategoryEnum.IncomeTransfer:
      return "/income/transfer-category-icon.webp";
    case TransactionCategoryEnum.IncomeInvestments:
      return "/income/investments-category-icon.webp";
    case TransactionCategoryEnum.IncomeBusiness:
      return "/income/business-category-icon.webp";
    case TransactionCategoryEnum.IncomeGift:
      return "/income/gift-category-icon.webp";
    case TransactionCategoryEnum.IncomeDeposit:
      return "/income/deposit-category-icon.webp";
    case TransactionCategoryEnum.IncomeSales:
      return "/income/sales-category-icon.webp";
    case TransactionCategoryEnum.IncomeOther:
      return "/income/other-category-icon.webp";
    case TransactionCategoryEnum.ExpenseBizum:
      return "/expense/bizum-category-icon.webp";
    case TransactionCategoryEnum.ExpenseTransfer:
      return "/expense/transfer-category-icon.webp";
    case TransactionCategoryEnum.ExpenseHousing:
      return "/expense/housing-category-icon.webp";
    case TransactionCategoryEnum.ExpenseTransportation:
      return "/expense/transportation-category-icon.webp";
    case TransactionCategoryEnum.ExpenseFood:
      return "/expense/food-category-icon.webp";
    case TransactionCategoryEnum.ExpenseHealth:
      return "/expense/health-category-icon.webp";
    case TransactionCategoryEnum.ExpenseDebt:
      return "/expense/debt-category-icon.webp";
    case TransactionCategoryEnum.ExpenseInvestments:
      return "/expense/investments-category-icon.webp";
    case TransactionCategoryEnum.ExpenseFamily:
      return "/expense/family-category-icon.webp";
    case TransactionCategoryEnum.ExpenseLeisure:
      return "/expense/leisure-category-icon.webp";
    case TransactionCategoryEnum.ExpenseVacations:
      return "/expense/vacations-category-icon.webp";
    case TransactionCategoryEnum.ExpenseInsurance:
      return "/expense/insurance-category-icon.webp";
    case TransactionCategoryEnum.ExpenseTaxes:
      return "/expense/taxes-category-icon.webp";
    case TransactionCategoryEnum.ExpenseBills:
      return "/expense/bills-category-icon.webp";
    case TransactionCategoryEnum.ExpenseShopping:
      return "/expense/shopping-category-icon.webp";
    case TransactionCategoryEnum.ExpenseOther:
      return "/expense/other-category-icon.webp";
    default:
      return "/income/other-category-icon.webp";
  }
}
