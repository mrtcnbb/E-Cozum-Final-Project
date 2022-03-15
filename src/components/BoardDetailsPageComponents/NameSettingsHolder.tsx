import { Flex } from '@chakra-ui/react';
import { FC, useState } from 'react';
import EditableText from './EditableText';
import SubCompSettingsMenu from './SubCompSettingsMenu';

interface NameSettingsHolderProps {
  subCompName: string;
}

const NameSettingsHolder: FC<NameSettingsHolderProps> = ({ subCompName }) => {
  const [editItemName, setEditItemName] = useState(false);

  const handleEditItemName = (isEditable: boolean) => {
    setEditItemName(isEditable);
  };

  return (
    <Flex height={8} width="full" boxSizing="border-box" justifyContent="space-between" alignItems="center">
      <EditableText
        textColor="black"
        textSize="md"
        editItemName={editItemName}
        handleEditItemName={handleEditItemName}
      />
      <SubCompSettingsMenu subCompName={subCompName} handleEditListName={handleEditItemName} />
    </Flex>
  );
};

export default NameSettingsHolder;
