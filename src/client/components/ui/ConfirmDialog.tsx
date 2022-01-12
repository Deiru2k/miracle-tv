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
  return (
    <Modal {...props}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Confirm action</ModalHeader>
        <ModalBody>{children}</ModalBody>
        <ModalFooter>
          <HStack>
            <Button colorScheme="gray" onClick={props.onClose}>
              No
            </Button>
            <Button
              onClick={onConfirm}
              colorScheme={confirmColorScheme}
              isLoading={isLoading}
            >
              Yes
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
