import {
  both,
  compose,
  flip,
  hasPath,
  lensPath,
  set,
  unless,
  view,
} from "ramda";

export const swapDeep =
  <T extends any[]>(a: number[]) =>
  (b: number[]) =>
  (list: T) => {
    const lensPathA = lensPath(a);
    const lensPathB = lensPath(b);
    const valueA = view(lensPathA, list);
    const valueB = view(lensPathB, list);
    const noPath = flip(hasPath);

    const outOfBounds = both(noPath(a), noPath(a));
    const makeSwap = compose(set(lensPathB, valueA), set(lensPathA, valueB));

    return unless(outOfBounds, makeSwap)(list);
  };
