export interface ILegacyLegendSource {
  key: string;
  display: string;
}

export class LegendSource implements ILegacyLegendSource {
  constructor() {
  }

  key: string;
  display: string;
}
