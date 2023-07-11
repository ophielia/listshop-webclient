import {IItemSource} from "./item-source";
import {Category} from "./category";
import {ILegendSource} from "./legend-source";

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

