import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { useField } from "react-final-form";
import { Markdown } from "../ui/Markdown";
import { FormGroup } from "./FormGroup";
import { FormTextarea, FormTextareaProps } from "./FormTextarea";

export const FormMarkdown = ({ label, ...props }: FormTextareaProps) => {
  const { input } = useField(props.name);
  console.log(input.value);
  return (
    <FormGroup name={props.name} label={label}>
      <Tabs>
        <TabList>
          <Tab>Editor</Tab>
          <Tab>Preview</Tab>
        </TabList>
        <TabPanels>
          <TabPanel px={0}>
            <FormTextarea {...props} />
          </TabPanel>
          <TabPanel px={4}>
            <Markdown>{input.value}</Markdown>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </FormGroup>
  );
};
