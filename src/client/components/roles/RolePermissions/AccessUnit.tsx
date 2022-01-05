import { Box, Text, HStack, Switch } from "@chakra-ui/react";
import { AccessRights, AccessUnit } from "miracle-tv-shared/graphql";
import { uniq } from "ramda";
import React, { useCallback, useEffect, useState } from "react";

type Props = {
  unit: keyof AccessRights;
  unitValue: AccessUnit[];
  onChange: (u: keyof AccessRights, v: AccessUnit[]) => void;
};

const accessUnitOrder: AccessUnit[] = [
  AccessUnit.Inherit,
  AccessUnit.Self,
  AccessUnit.Deny,
  AccessUnit.Read,
  AccessUnit.Write,
];

const accessUnitLabels: Record<AccessUnit, string> = {
  [AccessUnit.Inherit]: "Inherit",
  [AccessUnit.Self]: "Self",
  [AccessUnit.Deny]: "Deny",
  [AccessUnit.Read]: "Read",
  [AccessUnit.Write]: "Write",
};

export const AccessUnitEdit = ({ unit, unitValue, onChange }: Props) => {
  const [value, setValue] = useState<AccessUnit[]>(unitValue);

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

  useEffect(() => {
    onChange(unit, value);
  }, [value]);

  return (
    <HStack w="100%" justify="space-between">
      {accessUnitOrder.map((u) => (
        <Box key={u}>
          <Text as="div" fontWeight="bold">
            {accessUnitLabels[u]}
          </Text>
          <Switch isChecked={isEnabled(u)} onChange={() => toggleUnit(u)} />
        </Box>
      ))}
    </HStack>
  );
};
