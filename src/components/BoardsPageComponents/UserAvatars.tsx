import { AvatarGroup, Avatar } from '@chakra-ui/react';
import React, { FC } from 'react';

const UserAvatars: FC = () => {
  return (
    <AvatarGroup size="sm" max={5}>
      <Avatar name="Ryan Florence" src="https://bit.ly/ryan-florence" />
      <Avatar name="Segun Adebayo" src="https://bit.ly/sage-adebayo" />
      <Avatar name="Kent Dodds" src="https://bit.ly/kent-c-dodds" />
      <Avatar name="Prosper Otemuyiwa" src="https://bit.ly/prosper-baba" />
      <Avatar name="Christian Nwamba" src="https://bit.ly/code-beast" />
      <Avatar name="Ryan Florence" src="https://bit.ly/ryan-florence" />
      <Avatar name="Segun Adebayo" src="https://bit.ly/sage-adebayo" />
      <Avatar name="Kent Dodds" src="https://bit.ly/kent-c-dodds" />
      <Avatar name="Prosper Otemuyiwa" src="https://bit.ly/prosper-baba" />
      <Avatar name="Christian Nwamba" src="https://bit.ly/code-beast" />
    </AvatarGroup>
  );
};

export default UserAvatars;
