export const DEFAULT_RENDER = <T>(record: any, index?: T) => {
  return index ? record[index] : '';
};