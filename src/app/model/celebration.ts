
export interface ICelebration {
  handle: string;
  start_date: string;
  end_date: string;
  hostess_greeting_title: string;
  hostess_greeting: string;
  hostess_display: boolean;
  waiter_title: string;
  party_title: string;
  party_text: string;
  throw_confetti_count: number;

}


export class Celebration implements ICelebration {

  constructor() {
  }

  handle: string;
  start_date: string;
  end_date: string;
  hostess_greeting_title: string;
  hostess_greeting: string;
  hostess_display: boolean;
  waiter_title: string;
  party_title: string;
  party_text: string;
  throw_confetti_count: number;
}


