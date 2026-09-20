export interface ILegendSource {
  related_id: string;
  display: string;
  source_type: string;
}

export class ApiLegendSource implements ILegendSource {
  constructor() {
  }
  related_id: string;
  display: string;
  source_type: string;
}
