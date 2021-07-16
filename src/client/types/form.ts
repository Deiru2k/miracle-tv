import { AnyObject } from "final-form";

export type HandleSubmitFunction = (
  event?: Partial<
    Pick<React.SyntheticEvent, "preventDefault" | "stopPropagation">
  >
) => Promise<AnyObject | undefined> | undefined;
