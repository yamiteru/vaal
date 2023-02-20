import { filter, error, errorTuple } from "pipem";

export const instance = <$Type>(desiredInstance: { new (): $Type }) =>
  error(
    filter((v: $Type) => v instanceof desiredInstance === true),
    (value) => errorTuple("INSTANCE", value, { desiredInstance }),
  );
