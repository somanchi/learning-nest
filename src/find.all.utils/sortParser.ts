import { ParserException } from 'src/exceptions/parser.exception';
import { Sort } from '../entities/sort';
import { isSortValid } from './validator';

export const sortParser = (sorts: string, modelName: string) => {
  const processedSort: Sort[] = [];
  let sortDirection = '';
  let sortField = '';
  const erroMessages = [];
  try {
    if (sorts === '') {
      return processedSort;
    }
    sorts.split(',').forEach((entry) => {
      if (entry.charAt(0) === '+' || entry.charAt(0) === '-') {
        sortDirection = entry.charAt(0);
        sortField = entry.substring(1);
      } else {
        sortDirection = '-';
        sortField = entry;
      }
      if (isSortValid(modelName, sortField)) {
        processedSort.push(new Sort(sortField, sortDirection));
      } else {
        erroMessages.push(`${modelName} has no sort field ${sortField}`);
      }
    });
  } catch (e) {
    throw new ParserException('failed to parse sort');
  }

  if (erroMessages.length > 0) {
    throw new ParserException(erroMessages.join(','));
  }
  return processedSort;
};
