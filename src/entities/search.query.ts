export class SearchQuery {
  filterName: string;
  operation: string;
  filterValue: string;

  public constructor(
    filterName: string,
    operation: string,
    filterValue: string,
  ) {
    this.filterName = filterName;
    this.operation = operation;
    this.filterValue = filterValue;
  }
}

export const Operations = {
  eq: '$eq',
  gt: '$gt',
  gte: '$gte',
  lt: '$lt',
  lte: '$lte',
};
