import { Box, Avatar, Input, Button } from '@chakra-ui/react';
import React, { FC, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useParams } from 'react-router-dom';
import { fetchBoard } from '../../../features/boardSlice';
import useCardToast from '../../../hooks/useCardToast';
import authRequest from '../../../service/authRequest';
import { useAppDispatch } from '../../../store';
import CardModalSection from './CardModalSection';

interface CardModalCommentProps {
  cardId: number;
}

const CardModalComment: FC<CardModalCommentProps> = ({ cardId }) => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { showToast } = useCardToast();
  const [cookies] = useCookies(['token', 'username']);

  const [createCommentObject, setCreateCommentObject] = useState({
    cardId: cardId,
    message: '',
  });

  const onCardCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCreateCommentObject((prev) => ({ ...prev, message: event.target.value }));
  };

  const createCardComment = () => {
    authRequest()
      .post(`comment`, createCommentObject)
      .then(() => {
        dispatch(fetchBoard(id!));
        showToast();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Box id="COMMENT ENTRY" display="flex" flexDirection="column" gap="5px">
      <CardModalSection iconType="BiCommentDetail" sectionName="Comment" />
      <Box display="flex" flexDirection="row" alignItems="flex-start" gap="15px">
        <Box>
          <Avatar bg="purple.500" color="white" name={cookies.username} size="sm" />
        </Box>
        <Box width="full" display="flex" flexDirection="column" alignItems="start" gap="15px">
          <Input
            placeholder="Add comment"
            size="lg"
            fontSize="sm"
            value={createCommentObject.message}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => onCardCommentChange(event)}
          />
          <Button
            disabled={createCommentObject.message.trim() === ''}
            colorScheme="teal"
            variant="solid"
            borderRadius="100"
            size="sm"
            onClick={() => {
              createCardComment();
              setCreateCommentObject((prev) => ({ ...prev, message: '' }));
            }}
          >
            Save
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default CardModalComment;
