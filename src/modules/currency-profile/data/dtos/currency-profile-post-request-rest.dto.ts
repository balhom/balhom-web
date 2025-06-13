import { CurrencyEnum } from "../enums/currency-enum";
import { CreateCurrencyProfileProps } from "../props/create-currency-profile-props";

export interface CurrencyProfilePostRequestRestDto {
  name: string;
  currencyCode: CurrencyEnum;
  balance: number;
  initDate: string;
  goalMonthlySaving: number;
  goalYearlySaving: number;
}

export function currencyProfileCreatePropsToPostRequestRestDto(
  props: CreateCurrencyProfileProps
): CurrencyProfilePostRequestRestDto {
  return {
    name: props.name,
    currencyCode: props.currency,
    balance: props.balance,
    initDate: props.initialDate.toISOString(),
    goalMonthlySaving: props.monthlySavingsGoal,
    goalYearlySaving: props.yearlySavingsGoal,
  };
}
