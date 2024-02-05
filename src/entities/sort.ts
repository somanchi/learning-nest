export class Sort {
  columnName: string;
  orderType: string = '-';

  public constructor(columnName: string, orderType: string) {
    this.columnName = columnName;
    this.orderType = orderType;
  }
}
