import { ChevronRightIcon } from '@chakra-ui/icons';
import { Breadcrumb, BreadcrumbItem, Text } from '@chakra-ui/react';
import React, { FC } from 'react';

interface CardModalBreadcrumbProps {
  boardName: string;
  listName: string;
}

const CardModalBreadcrumb: FC<CardModalBreadcrumbProps> = ({ boardName, listName }) => {
  return (
    <Breadcrumb spacing="4px" separator={<ChevronRightIcon color="gray.500" />}>
      <BreadcrumbItem>
        <Text>{boardName}</Text>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <Text>{listName}</Text>
      </BreadcrumbItem>
    </Breadcrumb>
  );
};

export default CardModalBreadcrumb;
