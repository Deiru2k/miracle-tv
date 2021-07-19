import React, { useCallback, useEffect, useRef } from "react";
import { gql } from "@apollo/client";
import {
  AspectRatio,
  Box,
  Flex,
  FlexProps,
  Heading,
  IconButton,
  Image,
  ResponsiveValue,
  Spinner,
} from "@chakra-ui/react";
import {
  useGetFileForUploaderQuery,
  useUploadFileWithUploaderMutation,
} from "miracle-tv-shared/hooks";
import { useField } from "react-final-form";
import { AttachmentIcon, CloseIcon } from "@chakra-ui/icons";

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

  return (
    <Flex
      direction="column"
      align={["center", "unset"]}
      w={aspectMaxW}
      h={aspectMaxH}
      {...flexProps}
    >
      {!fileInfo && !(loading || fileUploading) && (
        <AspectRatio
          w="100%"
          ratio={ratio}
          mb={4}
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
            backgroundColor="secondary.600"
            borderRadius="4px"
          >
            <Heading size="sm" mb={2}>
              Upload
            </Heading>
            <AttachmentIcon size="lg" w="45%" h="45%" color="primary.200" />
          </Flex>
        </AspectRatio>
      )}
      {!fileInfo && (loading || fileUploading) && (
        <AspectRatio
          w="100%"
          ratio={ratio}
          mb={4}
          maxW={aspectMaxW}
          maxH={aspectMaxH}
        >
          <Box
            w="100%"
            h="100%"
            backgroundColor="secondary.600"
            borderRadius="4px"
          >
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
              src={`${process.env.NEXT_PUBLIC_MEDIA_URL}/${fileInfo.filename}`}
              borderRadius={8}
              boxSizing="border-box"
              borderWidth="3px"
              borderStyle="dashed"
              borderColor="primary.200"
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
              color="primary.200"
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
