import React from "react";
import { Button } from "@chakra-ui/react";
import { createShowcase } from "miracle-tv-shared/showcase/create";

export default createShowcase(<Button children={"Button"} />, {
  title: "Button",
});
