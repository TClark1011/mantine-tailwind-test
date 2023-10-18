export const keys = <TheObject extends Record<string, any>>(obj: TheObject) =>
  Object.keys(obj) as (keyof TheObject)[];

export const reduceToObject = <Element, Key extends string, Value>(
  items: Element[],
  keyGenerator: (element: Element, index: number, list: Element[]) => Key,
  valueGenerator: (
    element: Element,
    key: Key,
    index: number,
    list: Element[],
  ) => Value,
): Record<Key, Value> => {
  const result = {} as Record<Key, Value>;

  items.forEach((item, index, fullList) => {
    const key = keyGenerator(item, index, fullList);
    const value = valueGenerator(item, key, index, fullList);

    result[key] = value;
  });

  return result;
};
