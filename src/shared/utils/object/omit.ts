import { omit } from "ramda";

export function omitDeep<T extends object = object, R extends object = object>(
  input: T,
  props: string[]
): R {
  function omitDeepOnOwnProps(obj: object): object | object[] {
    if (typeof input === "undefined") {
      return input;
    }

    if (!Array.isArray(obj) && !isObject(obj)) {
      return obj;
    }

    if (Array.isArray(obj)) {
      return omitDeep(obj, props);
    }

    const o: any = {};
    for (const [key, value] of Object.entries(obj)) {
      o[key] = !isNil(value) ? omitDeep(value, props) : value;
    }

    const res = omit(props, o);
    return res;
  }

  if (arguments.length > 2) {
    props = Array.prototype.slice.call(arguments).slice(1);
  }

  if (Array.isArray(input)) {
    return input.map(omitDeepOnOwnProps) as unknown as R;
  }

  return omitDeepOnOwnProps(input) as unknown as R;
}

function isNil(value: any | null) {
  return value === null || value === undefined;
}

function isObject(obj: any | null) {
  return Object.prototype.toString.call(obj) === "[object Object]";
}
