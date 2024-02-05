export const allowedModelFilters: Map<
  string,
  Map<string, string[]>
> = new Map();

const allowedCarFilters: Map<string, string[]> = new Map();
allowedCarFilters.set('name', ['eq', 'gt']);
allowedModelFilters.set('Car', allowedCarFilters);

export const allowedModelSorts: Map<string, Set<string>> = new Map();

allowedModelSorts.set('Car', new Set(['name']));

// export const getModelFilter = (modelName: string) => {
//   return allowedModelFilters.get(modelName) || new Map();
// };

// export const getModelSorts = (modelName: string) => {
//   return allowedModelSorts.get(modelName) || new Set();
// };

export const regex = /(\w+):(\w+):(.*)/;
