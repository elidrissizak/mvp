/**
 * Represents an Country.
 */
export class Country {
  id: string;
  labelEN: string;
  labelFR: string;

  constructor(labelEN: string, labelFR: string) {
    this.id = labelEN;
    this.labelEN = labelEN;
    this.labelFR = labelFR;
  }
}
