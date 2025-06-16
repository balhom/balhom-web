export function formatAmountAndCurrency(
  amount: number,
  currency: string
): string {
  return amount.toFixed(2).replace(".", ",") + " " + currency.toString();
}
