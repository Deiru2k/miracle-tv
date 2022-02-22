import {
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  UseDisclosureReturn,
} from "@chakra-ui/react";
import React from "react";
import { useTranslation } from "react-i18next";

type Props = {
  children: React.ReactNode;
  onConfirm: () => void;
  confirmColorScheme?: string;
  isLoading?: boolean;
} & Pick<UseDisclosureReturn, "isOpen" | "onClose">;

export const ConfirmDialog = ({
  children,
  confirmColorScheme,
  isLoading,
  onConfirm,
  ...props
}: Props) => {
  const { t: tCommon } = useTranslation("common");

  return (
    <Modal {...props}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Confirm action</ModalHeader>
        <ModalBody>{children}</ModalBody>
        <ModalFooter>
          <HStack>
            <Button colorScheme="gray" onClick={props.onClose}>
              {tCommon("no")}
            </Button>
            <Button
              onClick={onConfirm}
              colorScheme={confirmColorScheme}
              isLoading={isLoading}
            >
              {tCommon("yes")}
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
