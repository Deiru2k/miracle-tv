import { Box, Text, HStack, Switch } from "@chakra-ui/react";
import { AccessRights, AccessUnit } from "miracle-tv-shared/graphql";
import { uniq } from "ramda";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { TranslationFn } from "src/types";

type Props = {
  unit: keyof AccessRights;
  unitValue: AccessUnit[];
  onChange: (u: keyof AccessRights, v: AccessUnit[]) => void;
  isDisabled?: boolean;
};

const accessUnitOrder: AccessUnit[] = [
  AccessUnit.Inherit,
  AccessUnit.Self,
  AccessUnit.Deny,
  AccessUnit.Read,
  AccessUnit.Write,
];

type LabelsFn = (tFn?: TranslationFn) => Record<AccessUnit, string>;

const accessUnitLabels: LabelsFn = (tFn) => ({
  [AccessUnit.Inherit]: tFn?.("permission-inherit") ?? "Inherit",
  [AccessUnit.Self]: tFn?.("permission-self") ?? "Self",
  [AccessUnit.Deny]: tFn?.("permission-deny") ?? "Deny",
  [AccessUnit.Read]: tFn?.("permission-read") ?? "Read",
  [AccessUnit.Write]: tFn?.("permission-write") ?? "Write",
});

export const AccessUnitEdit = ({
  unit,
  unitValue,
  onChange,
  isDisabled,
}: Props) => {
  const { t: tRoles } = useTranslation("role");
  const [value, setValue] = useState<AccessUnit[]>(
    unitValue.length > 0 ? unitValue : [AccessUnit.Inherit]
  );

  const isEnabled = useCallback(
    (valueToCheck: AccessUnit) => {
      return value.includes(valueToCheck);
    },
    [value]
  );
  const toggleUnit = useCallback(
    (newValue: AccessUnit) => {
      if (!isEnabled(newValue)) {
        let newValues = uniq([...value, newValue]);
        if (newValue !== AccessUnit.Inherit) {
          newValues = newValues.filter((v) => v !== AccessUnit.Inherit);
        }
        setValue(newValues);
      } else {
        let newValues = value.filter((v) => v !== newValue);
        if (newValues.length === 0 && newValue !== AccessUnit.Inherit) {
          newValues = [AccessUnit.Inherit];
        }
        setValue(newValues);
      }
    },
    [isEnabled, value, setValue]
  );

  const unitLabels = useMemo(() => accessUnitLabels(tRoles), [tRoles]);

  useEffect(() => {
    onChange(unit, value);
  }, [value]);

  return (
    <HStack w="100%" justify="space-between">
      {accessUnitOrder.map((u) => (
        <Box key={u}>
          <Text as="div" fontWeight="bold">
            {unitLabels[u]}
          </Text>{" "}
          <Switch
            isChecked={isEnabled(u)}
            onChange={() => toggleUnit(u)}
            isDisabled={isDisabled}
          />
        </Box>
      ))}
    </HStack>
  );
};
