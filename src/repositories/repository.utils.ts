import { Injectable } from '@nestjs/common';
import { filterParser } from 'src/find.all.utils/filterParser';
import { sortParser } from 'src/find.all.utils/sortParser';

@Injectable()
export class RepositoryUtils {
  filterConditionProcessor(filters: string, modelName: string) {
    const processedFilters = filterParser(filters, modelName);
    const conditions = {};
    processedFilters.forEach((filter) => {
      const condition = {};
      condition[filter.operation] = filter.filterValue;
      conditions[filter.filterName] = condition;
    });

    return conditions;
  }

  orderByConditionProcessor(sort: string, modelName: string) {
    const sortConditions = {};
    const processedSort = sortParser(sort, modelName);
    processedSort.forEach((entry) => {
      sortConditions[entry.columnName] = entry.orderType === '+' ? 1 : -1;
    });
    return sortConditions;
  }
}
