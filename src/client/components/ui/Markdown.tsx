import {
  Divider,
  Heading,
  Image,
  ListItem,
  OrderedList,
  Spinner,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Link } from "./Link";

type Props = {
  children: string;
};

const components = {
  h1: (props: any) => (
    <>
      <Heading as="h1" {...props} mb={1} />
      <Divider mb={2} />
    </>
  ),
  h2: (props: any) => (
    <>
      <Heading as="h2" size="lg" {...props} mb={1} />
      <Divider mb={2} />
    </>
  ),
  h3: (props: any) => <Heading as="h3" {...props} size="md" />,
  h4: (props: any) => <Heading as="h4" {...props} size="sm" />,
  h5: (props: any) => <Heading as="h5" {...props} size="xs" />,
  h6: (props: any) => <Text as="h6" {...props} fontWeight="bold" />,
  img: (props: any) => <Image {...props} fallback={<Spinner />} />,
  a: (props: any) => <Link {...props} />,
  ul: (props: any) => <UnorderedList {...props} />,
  ol: (props: any) => <OrderedList {...props} />,
  li: (props: any) => <ListItem {...props} />,
};
export const Markdown = (props: Props) => {
  return (
    <ReactMarkdown
      {...props}
      components={components}
      remarkPlugins={[remarkGfm]}
    />
  );
};
