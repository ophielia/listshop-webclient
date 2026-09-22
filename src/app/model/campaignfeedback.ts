
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

