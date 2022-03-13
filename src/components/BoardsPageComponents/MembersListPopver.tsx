import { AtSignIcon } from '@chakra-ui/icons';
import {
  Popover,
  PopoverTrigger,
  IconButton,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Checkbox,
  Stack,
  Button,
  useDisclosure,
  ButtonGroup,
} from '@chakra-ui/react';
import { FC, useRef } from 'react';

const MembersListPopver: FC = () => {
  // const { onClose } = usePopoverContext();
  const { onOpen, onClose, isOpen } = useDisclosure();
  const firstFieldRef = useRef(null);

  return (
    <Popover
      placement="top-start"
      isOpen={isOpen}
      initialFocusRef={firstFieldRef}
      onOpen={onOpen}
      onClose={onClose}
      closeOnBlur={false}
    >
      <PopoverTrigger>
        <IconButton colorScheme="purple" size="xs" aria-label="allow users" icon={<AtSignIcon />} />
      </PopoverTrigger>
      <PopoverContent height="40" overflow="auto">
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>Users to see this board</PopoverHeader>
        <PopoverBody>
          <Stack spacing={1} direction="column">
            <Checkbox colorScheme="red">Checkbox</Checkbox>
            <Checkbox colorScheme="red">Checkbox</Checkbox>
            <Checkbox colorScheme="red">Checkbox</Checkbox>
            <Checkbox colorScheme="red">Checkbox</Checkbox>
            <Checkbox colorScheme="red">Checkbox</Checkbox>
            <Checkbox colorScheme="red">Checkbox</Checkbox>
            <Checkbox colorScheme="red">Checkbox</Checkbox>
            <Checkbox colorScheme="red">Checkbox</Checkbox>
          </Stack>
          <hr />
          {/* Butonun onclick inde popover kapanmalı */}
          <ButtonGroup d="flex" justifyContent="flex-end">
            <Button size="sm" color="purple.300" my={2} onClick={onClose}>
              Save
            </Button>
          </ButtonGroup>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default MembersListPopver;
