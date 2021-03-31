export class Item {
  constructor(
    public title: string, // string - "dasdas"
    public price: number, // 12.2131
    public imgSrc: string, // boolean - true/false
    public category: string, // string[]
    public barcode: number,
    public producer: string,
    public description: string
  ) {}

  // getTitle() {
  //   return this.title;
  // }
}