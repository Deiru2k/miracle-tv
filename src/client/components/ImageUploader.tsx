import React, { useCallback, useRef } from "react";
import { gql } from "@apollo/client";
import {
  AspectRatio,
  Box,
  Button,
  Flex,
  FlexProps,
  Heading,
  IconButton,
  Image,
  ResponsiveValue,
  Spinner,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  useGetFileForUploaderQuery,
  useUploadFileWithUploaderMutation,
} from "miracle-tv-shared/hooks";
import { useField } from "react-final-form";
import { AttachmentIcon, CloseIcon } from "@chakra-ui/icons";
import { getMediaURL } from "miracle-tv-shared/media";

gql`
  query GetFileForUploader($id: ID!) {
    fileInfo(id: $id) {
      id
      filename
      mimetype
      encoding
    }
  }
  mutation UploadFileWithUploader($input: Upload!) {
    uploadFile(file: $input) {
      id
      filename
      mimetype
      encoding
    }
  }
`;

type Props = {
  name: string;
  ratio?: ResponsiveValue<number>;
  aspectMaxW?: ResponsiveValue<string>;
  aspectMaxH?: ResponsiveValue<string>;
} & FlexProps;

export const ImageUploader = ({
  name,
  ratio = 1,
  aspectMaxW,
  aspectMaxH,
  ...flexProps
}: Props): JSX.Element => {
  const { input } = useField(name);
  const inputRef = useRef<HTMLInputElement>(null);
  const { data: { fileInfo } = {}, loading } = useGetFileForUploaderQuery({
    variables: { id: input.value },
    skip: !input.value,
  });
  const [uploadFile, { loading: fileUploading }] =
    useUploadFileWithUploaderMutation({
      onCompleted: ({ uploadFile }) => {
        input.onChange(uploadFile.id);
      },
    });

  const clearFile = useCallback(() => {
    input.onChange(null);
  }, [input]);

  const onFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const input = e.target?.files?.item(0);
      uploadFile({ variables: { input } });
    },
    [uploadFile]
  );

  const openUpload = useCallback(() => {
    inputRef.current?.click();
  }, [inputRef.current]);

  const bgColor = useColorModeValue("transparent", "secondary.600");
  const color = useColorModeValue("primary.300", "primary.400");

  return (
    <Flex
      direction="column"
      align={["center", "unset"]}
      w={aspectMaxW}
      h={aspectMaxH}
      {...flexProps}
    >
      {!fileInfo && !(loading || fileUploading) && (
        <>
          <AspectRatio
            w="100%"
            ratio={ratio}
            mb={2}
            maxW={aspectMaxW}
            maxH={aspectMaxH}
          >
            <Flex
              w={aspectMaxW || "100%"}
              h={aspectMaxW || "100%"}
              cursor="pointer"
              aria-label="Choose file to upload"
              onClick={openUpload}
              justify="center"
              align="center"
              direction="column"
              borderRadius={8}
              borderWidth="3px"
              borderStyle="dashed"
              borderColor={color}
              bgColor={bgColor}
              mb={4}
            >
              <Heading size="sm" mb={2} color={color}>
                Upload
              </Heading>
              <AttachmentIcon size="lg" w="45%" h="45%" color={color} />
            </Flex>
          </AspectRatio>
          <Box mb={4}>
            <Button
              size="xs"
              mt={0}
              variant="link"
              color={color}
              onClick={openUpload}
            >
              <AttachmentIcon size="lg" color={color} mr={1} />
              Select File
            </Button>
          </Box>
        </>
      )}
      {!fileInfo && (loading || fileUploading) && (
        <AspectRatio
          w="100%"
          ratio={ratio}
          mb={4}
          maxW={aspectMaxW}
          maxH={aspectMaxH}
        >
          <Box w="100%" h="100%" bgColor={bgColor} borderRadius="4px">
            <Spinner color="primary.200" size="xl" />
          </Box>
        </AspectRatio>
      )}
      {!!fileInfo && !(loading || fileUploading) && (
        <>
          <AspectRatio
            w="100%"
            ratio={ratio}
            mb={4}
            maxW={aspectMaxW}
            maxH={aspectMaxH}
          >
            <Image
              src={`${getMediaURL(fileInfo.filename)}`}
              borderRadius={8}
              boxSizing="border-box"
              borderWidth="3px"
              borderStyle="dashed"
              borderColor={color}
              backgroundColor={bgColor}
            />
          </AspectRatio>
          <Box>
            <IconButton
              variant="link"
              color="red.300"
              aria-label="Remove Image"
              onClick={clearFile}
              icon={<CloseIcon />}
            />
            <IconButton
              variant="link"
              color={color}
              aria-label="Upload New"
              onClick={openUpload}
              icon={<AttachmentIcon />}
            />
          </Box>
        </>
      )}
      <input
        ref={inputRef}
        type="file"
        style={{ display: "none" }}
        onChange={onFileSelect}
      />
    </Flex>
  );
};
