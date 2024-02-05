import { allowedModelFilters, allowedModelSorts } from './fetch.constants';

export const isFilterOperationValid = (
  filterName: string,
  opeartion: string,
  modelName: string,
) => {
  const allowedFilters = allowedModelFilters.get(modelName) || new Map();
  const allowedOperations = allowedFilters.get(filterName) || [];

  if (allowedOperations.find((it) => it === opeartion)) {
    return true;
  }
  return false;
};

//allowedModelSorts.get(modelName).has(sortField)
export const isSortValid = (modelName: string, sortField: string) => {
  const allowedSorts = allowedModelSorts.get(modelName) || new Set();
  if (allowedSorts.has(sortField)) {
    return true;
  }
  return false;
};
