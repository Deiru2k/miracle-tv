import { Button, Grid } from "@chakra-ui/react";
import React, { useCallback, useState } from "react";
import { PanelItem } from "./PanelItem";
import { Panel } from "miracle-tv-shared/graphql";
import { useField } from "react-final-form";
import { swapDeep } from "miracle-tv-shared/utils/array/swap";
import { v4 as uuid4 } from "uuid";
import { insert, move, remove } from "ramda";

type OnDropCallback = <T = any>() => T;

const blocks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

type Props = {
  // Field name
  name: string;
  panels?: Record<string, Panel>;
  onSubmit?: () => void;
};

export const PanelsEditor = ({ name, panels }: Props) => {
  const [holdPosition, setHoldPosition] = useState<number | null>(null);
  const { input } = useField<string[]>(name);

  const onHover = useCallback(
    (oldIndex: number, newIndex: number) => {
      setHoldPosition(oldIndex);
      /* console.log(input.value); */
      /* console.log(move(oldIndex, newIndex, input.value));
       * input.onChange(move(oldIndex, newIndex, input.value)); */
    },
    [input, setHoldPosition]
  );

  const onDrop = useCallback(() => {}, [input]);

  const addPanel = useCallback(() => {
    input.onChange([...input.value, uuid4()]);
  }, [input]);

  return (
    <>
      <Button onClick={addPanel}>Add Panel</Button>
      <Grid
        flexWrap="wrap"
        gridGap={4}
        w="100%"
        gridTemplateColumns="repeat(3, 1fr)"
      >
        {input.value?.map((block, index) => (
          <PanelItem id={block} index={index} key={block} onHover={onHover} />
        ))}
      </Grid>
    </>
  );
};
