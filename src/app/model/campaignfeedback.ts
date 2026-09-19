import {IItemSource} from "./item-source";
import {LegacyCategory} from "./legacyCategory";
import {ILegacyLegendSource} from "./legend-source";

export interface ICampaignFeedback {
  campaign: string;
  email: string;
  text: string;
}

export class CampaignFeedback implements ICampaignFeedback {
  constructor() {
  }
  campaign: string;
  email: string;
  text: string;
}

