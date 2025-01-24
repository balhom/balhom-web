import { TransactionCategoryPointEntity } from "../modules/transactions/data/entities/transaction-category-statistics-entity";
import { TransactionCategoryEnum } from "../modules/transactions/data/enums/transaction-category-enum";

export const mockIncomeCategoryStatisticsPoints: TransactionCategoryPointEntity[] =
  [
    {
      category: {
        code: TransactionCategoryEnum.IncomeDeposit,
        image: "/income/deposit-category-icon.webp",
      },
      value: 5000,
    },
    {
      category: {
        code: TransactionCategoryEnum.IncomeGift,
        image: "/income/gift-category-icon.webp",
      },
      value: 2000,
    },
    {
      category: {
        code: TransactionCategoryEnum.IncomeSalary,
        image: "/income/salary-category-icon.webp",
      },
      value: 6000,
    },
    {
      category: {
        code: TransactionCategoryEnum.IncomeOther,
        image: "/income/other-category-icon.webp",
      },
      value: 500,
    },
  ];

export const mockExpenseCategoryStatisticsPoints: TransactionCategoryPointEntity[] =
  [
    {
      category: {
        code: TransactionCategoryEnum.ExpenseHealth,
        image: "/expense/expense-category-icon.webp",
      },
      value: 5000,
    },
    {
      category: {
        code: TransactionCategoryEnum.ExpenseHousing,
        image: "/expense/housing-category-icon.webp",
      },
      value: 2000,
    },
    {
      category: {
        code: TransactionCategoryEnum.ExpenseInvestments,
        image: "/expense/investments-category-icon.webp",
      },
      value: 6000,
    },
    {
      category: {
        code: TransactionCategoryEnum.ExpenseOther,
        image: "/expense/other-category-icon.webp",
      },
      value: 500,
    },
  ];
