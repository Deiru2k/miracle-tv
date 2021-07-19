import { Text } from "@chakra-ui/react";
import { createShowcase } from "miracle-tv-shared/showcase/create";
import React from "react";

const Page = () => {
  return <Text color="white">SHOWCASE</Text>;
};

export default createShowcase(<Page />, { title: "Home" });
