import { CloseIcon } from "@chakra-ui/icons";
import {
  Badge,
  Box,
  Text,
  Flex,
  Input,
  Spinner,
  useMultiStyleConfig,
  VStack,
} from "@chakra-ui/react";
import { equals, head, identity, uniq } from "ramda";
import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Panel } from "./Panel";

type SelectOption = { label: string; value: any };

export type SelectProps = {
  value: any | any[];
  multi?: boolean;
  options: SelectOption[];
  onChange: (v: any | any[]) => void;
  onSearch?: (query: string) => void;
  isDisabled?: boolean;
  isLoading?: boolean;
  placeholder?: string;
};

// TODO: Use chakra theming on Select
export const Select = ({
  options = [],
  value,
  onChange,
  multi = false,
  placeholder = "Select value...",
  isDisabled = false,
  isLoading = false,
  onSearch,
}: SelectProps) => {
  const [selectValue, setValue] = useState<any[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [showInput, setShowInput] = useState<boolean>(false);
  const inputStyle = useMultiStyleConfig("Input", {});
  const inputRef = useRef<HTMLInputElement>();

  useEffect(() => {
    let newValue = Array.isArray(value) ? value : [value].filter(identity);
    if (!equals(newValue, selectValue) && value !== "") {
      setValue(newValue);
    } else if (!equals(newValue, selectValue) && value === "") {
      setValue([]);
    }
  }, [value, selectValue]);

  const onInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onSearch?.(e.target.value);
      setInputValue(e.target.value);
    },
    [setInputValue]
  );

  const onSelectClick = useCallback(() => {
    if (!isDisabled) {
      setShowOptions(true);
      setShowInput(true);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 10);
    }
  }, [setShowOptions, setShowInput, multi, inputRef, isDisabled]);

  const onInputFocus = useCallback(() => {
    if (!isDisabled) {
      setShowOptions(true);
    }
  }, [setShowOptions, isDisabled]);

  const onInputBlur = useCallback(() => {
    setShowOptions(false);
    setShowInput(false);
    setInputValue("");
    onSearch?.("");
  }, [setShowOptions, setShowInput, multi]);

  const onOptionPick = useCallback(
    (v: string) => {
      const newValue = multi ? uniq([...selectValue, v]) : [v];
      const changeValue = multi ? newValue : head(newValue);
      setValue(newValue);
      onChange(changeValue);
      onSearch?.("");
      setShowOptions(false);
      setShowInput(false);
      setInputValue("");
    },
    [selectValue, setValue, setShowInput, multi]
  );

  const onOptionRemove = useCallback(
    (valueToRemove: string) => {
      const newValue = selectValue.filter((v) => v !== valueToRemove);
      const changeValue = multi ? newValue : head(newValue) || null;
      setValue(newValue);
      onChange(changeValue);
    },
    [selectValue, setValue]
  );

  const optionsMap = useMemo(
    () =>
      options.reduce(
        (acc, opt) => ({
          ...acc,
          [opt.value]: opt,
        }),
        {}
      ) as Record<string, { label: string; value: string }>,
    [options]
  );

  const filteredOptions = useMemo(() => {
    const notContainingValue = options.filter(
      (opt) => !selectValue.includes(String(opt.value))
    );
    const byInputValue = notContainingValue.filter((opt) =>
      !onSearch && inputValue !== ""
        ? opt.label.toLowerCase().includes(inputValue.toLowerCase())
        : true
    );
    return byInputValue;
  }, [options, selectValue, inputValue]);

  return (
    <>
      <Flex
        id="selectContainer"
        flexDirection="column"
        position="relative"
        _hover={{
          cursor: isDisabled ? "not-allowed" : undefined,
        }}
      >
        {showOptions && (
          <Box
            position="fixed"
            h="100vh"
            w="100vw"
            top={0}
            left={0}
            onClick={onInputBlur}
          />
        )}
        <Flex
          __css={inputStyle.field}
          display="flex"
          id="selectBody"
          h="unset"
          minH={10}
          alignItems="center"
          direction="row"
          flexFlow="wrap"
          pt={1}
          pb={multi ? undefined : 1}
          px={2}
          borderBottomRadius={showOptions ? "0" : undefined}
          onClick={onSelectClick}
          zIndex={1}
        >
          {!selectValue.length && !showInput && placeholder}
          {showOptions && isLoading && (
            <Spinner pointerEvents="none" position="absolute" right="15px" />
          )}
          {!multi && !showInput && !!selectValue.length && (
            <Badge
              bgColor="primary.500"
              display="flex"
              alignItems="center"
              color="white"
              py={1}
              px={2}
              w="100%"
              justifyContent="space-between"
            >
              <Text
                as="span"
                maxW="100%"
                overflow="hidden"
                textOverflow="ellipsis"
              >
                {optionsMap[selectValue[0]]?.label}
              </Text>
              {!isDisabled && (
                <CloseIcon
                  onClick={(e: any) => {
                    e.stopPropagation();
                    onOptionRemove(selectValue[0]);
                  }}
                  height="100%"
                  fontSize="0.8rem"
                  cursor="pointer"
                />
              )}
            </Badge>
          )}
          {multi &&
            selectValue.map((v) => (
              <Badge
                bgColor="primary.500"
                mr={1}
                key={v}
                mb="5px"
                display="flex"
                alignItems="center"
                color="white"
                maxW="100%"
                py={1}
                px={2}
              >
                <Text
                  as="span"
                  maxW="100%"
                  overflow="hidden"
                  textOverflow="ellipsis"
                >
                  {optionsMap[v as keyof typeof optionsMap]?.label}
                </Text>
                {!isDisabled && (
                  <CloseIcon
                    h="0.5rem"
                    ml={1}
                    onClick={(e) => {
                      e.stopPropagation();
                      onOptionRemove(v);
                    }}
                    cursor="pointer"
                    zIndex={2}
                  />
                )}
              </Badge>
            ))}
          <Input
            ref={inputRef}
            display={showInput ? undefined : "none"}
            flex="1"
            border="none"
            w="unset"
            h="1rem"
            bgColor="transparent"
            pl={1}
            mb={1}
            value={inputValue}
            onChange={onInputChange}
            onFocus={onInputFocus}
            minWidth="10ch"
          />
        </Flex>
        <VStack
          as={Panel}
          id="selectOptions"
          position="absolute"
          display={showOptions ? "unset" : "none"}
          top="100%"
          maxHeight="20rem"
          w="100%"
          overflow="auto"
          zIndex={1}
          py={0}
          px={0}
          borderRadius={0}
          spacing={0}
        >
          {filteredOptions.map((opt) => (
            <Box
              py={2}
              px={2}
              key={opt.value}
              onClick={() => onOptionPick(String(opt.value))}
              transition="background-color 0.3s linear"
              _hover={{
                bgColor: "primary.500",
                textColor: "white",
                cursor: "pointer",
              }}
            >
              {opt.label}
            </Box>
          ))}
        </VStack>
      </Flex>
    </>
  );
};
