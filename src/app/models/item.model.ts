export class Item {
  constructor(
    public id: number,
    public title: string, // string - "dasdas" NIMI
    public price: number, // 12.2131
    public imgSrc: string, // boolean - true/false
    public category: string, // string[]
    public barcode: number, // 1312312
    public producer: string,
    public description: string, // "See toode on bla"
    public isActive: boolean, // true
    public size: string[], // ["38", "40"...]
    public count: number
  ) {}

  // getTitle() {
  //   return this.title;
  // }
}