export function formatCurrency(amount: number, currency: string): string {
  return amount.toString() + " " + currency.toString();
}
