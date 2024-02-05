import { regex } from './fetch.constants';
import { isFilterOperationValid } from './validator';
import { ParserException } from '../exceptions/parser.exception';
import { Operations, SearchQuery } from '../entities/search.query';

export const filterParser = (
  filters: string,
  modelName: string,
): SearchQuery[] => {
  try {
    const searchQuery: SearchQuery[] = [];
    const errorMessages: string[] = [];
    if (filters === '') {
      return searchQuery;
    }
    filters.split(':and:').forEach((filter) => {
      const matchResult = filter.match(regex);
      const filterName = matchResult[1];
      const operation = matchResult[2];
      const filterValue = matchResult[3];
      if (isFilterOperationValid(filterName, operation, modelName)) {
        searchQuery.push(
          new SearchQuery(filterName, Operations[operation], filterValue),
        );
      } else {
        errorMessages.push(
          `operation ${operation} is not allowed on ${filterName}`,
        );
      }
    });

    if (errorMessages.length > 0) {
      throw new ParserException(errorMessages.join(', \n'));
    }
    return searchQuery;
  } catch (e) {
    throw new ParserException('failed to parse');
  }
};
