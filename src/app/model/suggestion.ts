
export interface ISuggestion {
  text: string;
  type: string;
  reference_id: string;
}


export class Suggestion implements ISuggestion {

  constructor() {
  }

  text: string;
  type: string;
  reference_id: string;

}
