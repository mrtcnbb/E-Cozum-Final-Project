// import { Box, Button, Input } from '@chakra-ui/react';
// import React, { FC, useState } from 'react';

// const AddChecklist: FC = () => {
//   const [text, setText] = useState<string>('');
//   const navigationKeys = ['ArrowUp', 'ArrowDown', 'Escape'];
//   return (
//     <Box display={'flex'} flexDirection="column" justifyItems={'start'} alignItems={'end'} gap="10px">
//       <Box>
//         <Input
//           value={text}
//           onChange={(e) => {
//             e.stopPropagation();
//             setText(e.target.value);
//           }}
//           onKeyDown={(e) => {
//             if (!navigationKeys.includes(e.key)) {
//               e.stopPropagation();
//             }
//           }}
//         />
//       </Box>
//       <Box>
//         <Button rounded={'full'} disabled={text.trim() === ''} colorScheme="teal">
//           Add
//         </Button>
//       </Box>
//     </Box>
//   );
// };

// export default AddChecklist;

import { Box, Button, Icon, Input, Menu, MenuButton, MenuItem, MenuList, useMenuItem } from '@chakra-ui/react';
import React, { FC, useRef, useState } from 'react';
import { BiCheckSquare } from 'react-icons/bi';

interface AddChecklistProps {
  cardId: number;
}

const AddChecklist: FC<AddChecklistProps> = ({ cardId }) => {
  const [createChecklistObject, setCreateChecklistObject] = useState({
    title: '',
    cardId: cardId,
  });

  const inputRef = useRef<HTMLInputElement>(null);

  const handleCreateChecklist = (event: any) => {
    setCreateChecklistObject((prev) => ({ ...prev, title: event.target.value }));
  };

  const MenuInput = (props: any) => {
    const { role, ...rest } = useMenuItem(props);
    return (
      <Box px="3" role={role}>
        <Input ref={inputRef} placeholder="Checklist title" size="sm" {...rest} />
      </Box>
    );
  };

  return (
    <Menu>
      <MenuButton>
        <Icon _hover={{ cursor: 'pointer' }} as={BiCheckSquare} color="white" fontSize="2xl" />
      </MenuButton>
      <MenuList>
        <MenuInput />
        <MenuItem>
          <Button size={'sm'} rounded={'full'} colorScheme="teal" ml="auto">
            Add
          </Button>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default AddChecklist;
