export class Product {
  public id: string;
  public name: string;
  public condition: string;
  public msrp: number;
  public asin: string;
  public upc: string;
  public weight: string;
  public note: string;
  public creator: string;
  public link: string;
  constructor(
    name: string,
    condition: string,
    msrp: number,
    asin: string,
    upc: string,
    weight: string,
    note: string,
    creator: string
  ) {
    this.name = name;
    this.condition = condition;
    this.msrp = msrp;
    this.asin = asin;
    this.upc = upc;
    this.weight = weight;
    this.note = note;
    this.creator = creator;
  }
  /**
   * name
   */
  public clear() {
    this.name = '';
    this.condition = 'New';
    this.msrp = null;
    this.asin = '';
    this.upc = '';
    this.weight = '';
    this.note = '';
    this.creator = '';
    this.link = '';
  }
}
