import { StreamChangeTypeEnum } from "../../../../common/data/enums/stream-change-type-enum";

export interface CurrencyProfileChangeEventEntity {
  action: StreamChangeTypeEnum;
  id: string;
  balance: number;
  monthlyGoal: number;
  yearlyGoal: number;
  ownerId: string;
}
