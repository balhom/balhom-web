import { StreamChangeTypeEnum } from "../../../../common/data/enums/stream-change-type-enum";

export interface CurrencyProfileChangeEventEntity {
  action: StreamChangeTypeEnum;
  id: string;
  name: string;
  balance: number;
  monthlyGoal: number;
  yearlyGoal: number;
  imageUrl?: string;
  ownerId: string;
}
