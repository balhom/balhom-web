import { CurrencyEnum } from "../modules/currency-profile/data/enums/currency-enum";
import { TransactionEntity } from "../modules/transactions/data/entities/transaction-entity";
import { TransactionCategoryEnum } from "../modules/transactions/data/enums/transaction-category-enum";
import { TransactionTypeEnum } from "../modules/transactions/data/enums/transaction-type-enum";

export const mockIncomes: TransactionEntity[] = [
  {
    id: "1",
    title: "Monthly Salary",
    description: "Regular salary payment",
    type: TransactionTypeEnum.Income,
    amount: 2500,
    currency: CurrencyEnum.EUR,
    date: new Date(),
    category: {
      code: TransactionCategoryEnum.IncomeBizum,
      image: "",
    },
    documents: [
      {
        id: "1",
        name: "Invoice_March_2024.pdf",
        url: "http://localhost:9080/Invoice_March_2024.pdf",
        createdAt: new Date(2024, 3, 15),
      },
      {
        id: "2",
        name: "Receipt_123456.pdf",
        url: "http://localhost:9080/Invoice_March_2024.pdf",
        createdAt: new Date(2024, 3, 15),
      },
    ],
  },
  {
    id: "2",
    title: "Birthday Gift",
    description: "Gift from family",
    type: TransactionTypeEnum.Income,
    amount: 100,
    currency: CurrencyEnum.EUR,
    date: new Date(),
    category: {
      code: TransactionCategoryEnum.IncomeGift,
      image: "",
    },
    documents: [
      {
        id: "1",
        name: "Invoice_March_2024.pdf",
        url: "http://localhost:9080/Invoice_March_2024.pdf",
        createdAt: new Date(2024, 3, 15),
      },
      {
        id: "2",
        name: "Receipt_123456.pdf",
        url: "http://localhost:9080/Invoice_March_2024.pdf",
        createdAt: new Date(2024, 3, 15),
      },
    ],
  },
  {
    id: "3",
    title: "Rent Deposit Return",
    description: "Previous apartment deposit",
    type: TransactionTypeEnum.Income,
    amount: 800,
    currency: CurrencyEnum.EUR,
    date: new Date(),
    category: {
      code: TransactionCategoryEnum.IncomeDeposit,
      image: "",
    },
    documents: [
      {
        id: "1",
        name: "Invoice_March_2024.pdf",
        url: "http://localhost:9080/Invoice_March_2024.pdf",
        createdAt: new Date(2024, 3, 15),
      },
      {
        id: "2",
        name: "Receipt_123456.pdf",
        url: "http://localhost:9080/Invoice_March_2024.pdf",
        createdAt: new Date(2024, 3, 15),
      },
    ],
  },
  {
    id: "4",
    title: "Rent Deposit Return",
    description: "Previous apartment deposit",
    type: TransactionTypeEnum.Income,
    amount: 800,
    currency: CurrencyEnum.EUR,
    date: new Date(),
    category: {
      code: TransactionCategoryEnum.IncomeDeposit,
      image: "",
    },
    documents: [
      {
        id: "1",
        name: "Invoice_March_2024.pdf",
        url: "http://localhost:9080/Invoice_March_2024.pdf",
        createdAt: new Date(2024, 3, 15),
      },
      {
        id: "2",
        name: "Receipt_123456.pdf",
        url: "http://localhost:9080/Invoice_March_2024.pdf",
        createdAt: new Date(2024, 3, 15),
      },
    ],
  },
  {
    id: "5",
    title: "Rent Deposit Return",
    description: "Previous apartment deposit",
    type: TransactionTypeEnum.Income,
    amount: 800,
    currency: CurrencyEnum.EUR,
    date: new Date(),
    category: {
      code: TransactionCategoryEnum.IncomeDeposit,
      image: "",
    },
    documents: [
      {
        id: "1",
        name: "Invoice_March_2024.pdf",
        url: "http://localhost:9080/Invoice_March_2024.pdf",
        createdAt: new Date(2024, 3, 15),
      },
      {
        id: "2",
        name: "Receipt_123456.pdf",
        url: "http://localhost:9080/Invoice_March_2024.pdf",
        createdAt: new Date(2024, 3, 15),
      },
    ],
  },
  {
    id: "6",
    title: "Rent Deposit Return",
    description: "Previous apartment deposit",
    type: TransactionTypeEnum.Income,
    amount: 800,
    currency: CurrencyEnum.EUR,
    date: new Date(),
    category: {
      code: TransactionCategoryEnum.IncomeDeposit,
      image: "",
    },
    documents: [
      {
        id: "1",
        name: "Invoice_March_2024.pdf",
        url: "http://localhost:9080/Invoice_March_2024.pdf",
        createdAt: new Date(2024, 3, 15),
      },
      {
        id: "2",
        name: "Receipt_123456.pdf",
        url: "http://localhost:9080/Invoice_March_2024.pdf",
        createdAt: new Date(2024, 3, 15),
      },
    ],
  },
  {
    id: "7",
    title: "Rent Deposit Return",
    description: "Previous apartment deposit",
    type: TransactionTypeEnum.Income,
    amount: 800,
    currency: CurrencyEnum.EUR,
    date: new Date(),
    category: {
      code: TransactionCategoryEnum.IncomeDeposit,
      image: "",
    },
    documents: [
      {
        id: "1",
        name: "Invoice_March_2024.pdf",
        url: "http://localhost:9080/Invoice_March_2024.pdf",
        createdAt: new Date(2024, 3, 15),
      },
      {
        id: "2",
        name: "Receipt_123456.pdf",
        url: "http://localhost:9080/Invoice_March_2024.pdf",
        createdAt: new Date(2024, 3, 15),
      },
    ],
  },
  {
    id: "8",
    title: "Rent Deposit Return",
    description: "Previous apartment deposit",
    type: TransactionTypeEnum.Income,
    amount: 800,
    currency: CurrencyEnum.EUR,
    date: new Date(),
    category: {
      code: TransactionCategoryEnum.IncomeDeposit,
      image: "",
    },
    documents: [
      {
        id: "1",
        name: "Invoice_March_2024.pdf",
        url: "http://localhost:9080/Invoice_March_2024.pdf",
        createdAt: new Date(2024, 3, 15),
      },
      {
        id: "2",
        name: "Receipt_123456.pdf",
        url: "http://localhost:9080/Invoice_March_2024.pdf",
        createdAt: new Date(2024, 3, 15),
      },
    ],
  },
  {
    id: "9",
    title: "Rent Deposit Return",
    description: "Previous apartment deposit",
    type: TransactionTypeEnum.Income,
    amount: 800,
    currency: CurrencyEnum.EUR,
    date: new Date(),
    category: {
      code: TransactionCategoryEnum.IncomeDeposit,
      image: "",
    },
    documents: [
      {
        id: "1",
        name: "Invoice_March_2024.pdf",
        url: "http://localhost:9080/Invoice_March_2024.pdf",
        createdAt: new Date(2024, 3, 15),
      },
      {
        id: "2",
        name: "Receipt_123456.pdf",
        url: "http://localhost:9080/Invoice_March_2024.pdf",
        createdAt: new Date(2024, 3, 15),
      },
    ],
  },
  {
    id: "10",
    title: "Rent Deposit Return",
    description: "Previous apartment deposit",
    type: TransactionTypeEnum.Income,
    amount: 800,
    currency: CurrencyEnum.EUR,
    date: new Date(),
    category: {
      code: TransactionCategoryEnum.IncomeDeposit,
      image: "",
    },
    documents: [
      {
        id: "1",
        name: "Invoice_March_2024.pdf",
        url: "http://localhost:9080/Invoice_March_2024.pdf",
        createdAt: new Date(2024, 3, 15),
      },
      {
        id: "2",
        name: "Receipt_123456.pdf",
        url: "http://localhost:9080/Invoice_March_2024.pdf",
        createdAt: new Date(2024, 3, 15),
      },
    ],
  },
];

export const mockExpenses: TransactionEntity[] = [
  {
    id: "1",
    title: "Monthly Bills",
    description: "Regular bills payment",
    type: TransactionTypeEnum.Expense,
    amount: 2500,
    currency: CurrencyEnum.EUR,
    date: new Date(),
    category: {
      code: TransactionCategoryEnum.ExpenseBills,
      image: "",
    },
    documents: [
      {
        id: "1",
        name: "Invoice_March_2024.pdf",
        url: "http://localhost:9080/Invoice_March_2024.pdf",
        createdAt: new Date(2024, 3, 15),
      },
      {
        id: "2",
        name: "Receipt_123456.pdf",
        url: "http://localhost:9080/Invoice_March_2024.pdf",
        createdAt: new Date(2024, 3, 15),
      },
    ],
  },
  {
    id: "2",
    title: "Birthday Gift",
    description: "Gift for family",
    type: TransactionTypeEnum.Expense,
    amount: 100,
    currency: CurrencyEnum.EUR,
    date: new Date(),
    category: {
      code: TransactionCategoryEnum.ExpenseFamily,
      image: "",
    },
    documents: [
      {
        id: "1",
        name: "Invoice_March_2024.pdf",
        url: "http://localhost:9080/Invoice_March_2024.pdf",
        createdAt: new Date(2024, 3, 15),
      },
      {
        id: "2",
        name: "Receipt_123456.pdf",
        url: "http://localhost:9080/Invoice_March_2024.pdf",
        createdAt: new Date(2024, 3, 15),
      },
    ],
  },
  {
    id: "3",
    title: "Debt Deposit",
    description: "Debt deposit",
    type: TransactionTypeEnum.Expense,
    amount: 800,
    currency: CurrencyEnum.EUR,
    date: new Date(),
    category: {
      code: TransactionCategoryEnum.ExpenseDebt,
      image: "",
    },
    documents: [
      {
        id: "1",
        name: "Invoice_March_2024.pdf",
        url: "http://localhost:9080/Invoice_March_2024.pdf",
        createdAt: new Date(2024, 3, 15),
      },
      {
        id: "2",
        name: "Receipt_123456.pdf",
        url: "http://localhost:9080/Invoice_March_2024.pdf",
        createdAt: new Date(2024, 3, 15),
      },
    ],
  },
  {
    id: "4",
    title: "Debt Deposit",
    description: "Debt deposit",
    type: TransactionTypeEnum.Expense,
    amount: 800,
    currency: CurrencyEnum.EUR,
    date: new Date(),
    category: {
      code: TransactionCategoryEnum.ExpenseDebt,
      image: "",
    },
    documents: [
      {
        id: "1",
        name: "Invoice_March_2024.pdf",
        url: "http://localhost:9080/Invoice_March_2024.pdf",
        createdAt: new Date(2024, 3, 15),
      },
      {
        id: "2",
        name: "Receipt_123456.pdf",
        url: "http://localhost:9080/Invoice_March_2024.pdf",
        createdAt: new Date(2024, 3, 15),
      },
    ],
  },
  {
    id: "5",
    title: "Debt Deposit",
    description: "Debt deposit",
    type: TransactionTypeEnum.Expense,
    amount: 800,
    currency: CurrencyEnum.EUR,
    date: new Date(),
    category: {
      code: TransactionCategoryEnum.ExpenseDebt,
      image: "",
    },
    documents: [
      {
        id: "1",
        name: "Invoice_March_2024.pdf",
        url: "http://localhost:9080/Invoice_March_2024.pdf",
        createdAt: new Date(2024, 3, 15),
      },
      {
        id: "2",
        name: "Receipt_123456.pdf",
        url: "http://localhost:9080/Invoice_March_2024.pdf",
        createdAt: new Date(2024, 3, 15),
      },
    ],
  },
  {
    id: "6",
    title: "Debt Deposit",
    description: "Debt deposit",
    type: TransactionTypeEnum.Expense,
    amount: 800,
    currency: CurrencyEnum.EUR,
    date: new Date(),
    category: {
      code: TransactionCategoryEnum.ExpenseDebt,
      image: "",
    },
    documents: [
      {
        id: "1",
        name: "Invoice_March_2024.pdf",
        url: "http://localhost:9080/Invoice_March_2024.pdf",
        createdAt: new Date(2024, 3, 15),
      },
      {
        id: "2",
        name: "Receipt_123456.pdf",
        url: "http://localhost:9080/Invoice_March_2024.pdf",
        createdAt: new Date(2024, 3, 15),
      },
    ],
  },
  {
    id: "7",
    title: "Debt Deposit",
    description: "Debt deposit",
    type: TransactionTypeEnum.Expense,
    amount: 800,
    currency: CurrencyEnum.EUR,
    date: new Date(),
    category: {
      code: TransactionCategoryEnum.ExpenseDebt,
      image: "",
    },
    documents: [
      {
        id: "1",
        name: "Invoice_March_2024.pdf",
        url: "http://localhost:9080/Invoice_March_2024.pdf",
        createdAt: new Date(2024, 3, 15),
      },
      {
        id: "2",
        name: "Receipt_123456.pdf",
        url: "http://localhost:9080/Invoice_March_2024.pdf",
        createdAt: new Date(2024, 3, 15),
      },
    ],
  },
  {
    id: "8",
    title: "Debt Deposit",
    description: "Debt deposit",
    type: TransactionTypeEnum.Expense,
    amount: 800,
    currency: CurrencyEnum.EUR,
    date: new Date(),
    category: {
      code: TransactionCategoryEnum.ExpenseDebt,
      image: "",
    },
    documents: [
      {
        id: "1",
        name: "Invoice_March_2024.pdf",
        url: "http://localhost:9080/Invoice_March_2024.pdf",
        createdAt: new Date(2024, 3, 15),
      },
      {
        id: "2",
        name: "Receipt_123456.pdf",
        url: "http://localhost:9080/Invoice_March_2024.pdf",
        createdAt: new Date(2024, 3, 15),
      },
    ],
  },
  {
    id: "9",
    title: "Debt Deposit",
    description: "Debt deposit",
    type: TransactionTypeEnum.Expense,
    amount: 800,
    currency: CurrencyEnum.EUR,
    date: new Date(),
    category: {
      code: TransactionCategoryEnum.ExpenseDebt,
      image: "",
    },
    documents: [
      {
        id: "1",
        name: "Invoice_March_2024.pdf",
        url: "http://localhost:9080/Invoice_March_2024.pdf",
        createdAt: new Date(2024, 3, 15),
      },
      {
        id: "2",
        name: "Receipt_123456.pdf",
        url: "http://localhost:9080/Invoice_March_2024.pdf",
        createdAt: new Date(2024, 3, 15),
      },
    ],
  },
  {
    id: "10",
    title: "Debt Deposit",
    description: "Debt deposit",
    type: TransactionTypeEnum.Expense,
    amount: 800,
    currency: CurrencyEnum.EUR,
    date: new Date(),
    category: {
      code: TransactionCategoryEnum.ExpenseDebt,
      image: "",
    },
    documents: [
      {
        id: "1",
        name: "Invoice_March_2024.pdf",
        url: "http://localhost:9080/Invoice_March_2024.pdf",
        createdAt: new Date(2024, 3, 15),
      },
      {
        id: "2",
        name: "Receipt_123456.pdf",
        url: "http://localhost:9080/Invoice_March_2024.pdf",
        createdAt: new Date(2024, 3, 15),
      },
    ],
  },
];
