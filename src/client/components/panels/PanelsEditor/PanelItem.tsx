import { Box, Text, Divider, Heading } from "@chakra-ui/react";
import React from "react";
import { useDrag, useDrop } from "react-dnd";
import { PANEL_DRAG_TARGET } from "./const";

type Props<T extends Array<any>> = {
  id: number | string;
  index: number;
  value?: T;
  onHover?: (oldIndex: number, newIndex: number) => void;
  onDrop?: () => void;
};

export const PanelItem = <T extends any[]>({
  id = Math.random() * 1000,
  index,
  onHover,
}: Props<T>) => {
  const [{ isDragging }, drag, dragPreview] = useDrag<any, any, any>(() => ({
    type: PANEL_DRAG_TARGET,
    collect: (monitor) => ({ isDragging: monitor.isDragging(), id, index }),
    item: { index, id },
  }));

  const [_, drop] = useDrop<any, any, any>(() => ({
    accept: PANEL_DRAG_TARGET,
    hover: (item, monitor) => {
      onHover(item.index, index);
    },
  }));

  return isDragging ? (
    <Box ref={dragPreview} />
  ) : (
    <Box
      minHeight="300px"
      border="1px solid"
      borderColor="primary.200"
      borderRadius="2px"
      cursor="move"
      p={2}
      ref={drag}
    >
      <Box ref={drop} w="100%" h="100%">
        <Heading mb={2}>Lmao {id}</Heading>
        <Divider mb={2} />
        <Text>
          Lmao here's my awesome panel with custom content lmao lloling my ass
          out
        </Text>
      </Box>
    </Box>
  );
};
