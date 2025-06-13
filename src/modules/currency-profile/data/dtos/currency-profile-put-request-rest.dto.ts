import { UpdateCurrencyProfileProps } from "../props/update-currency-profile-props";

export interface CurrencyProfilePutRequestRestDto {
  name: string;
  balance: number;
  initDate: string;
  goalMonthlySaving: number;
  goalYearlySaving: number;
}

export function currencyProfileUpdatePropsToPutRequestRestDto(
  props: UpdateCurrencyProfileProps
): CurrencyProfilePutRequestRestDto {
  return {
    name: props.name,
    balance: props.balance,
    initDate: props.initialDate.toISOString(),
    goalMonthlySaving: props.monthlySavingsGoal,
    goalYearlySaving: props.yearlySavingsGoal,
  };
}
