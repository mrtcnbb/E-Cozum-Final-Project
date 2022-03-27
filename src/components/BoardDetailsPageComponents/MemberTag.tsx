import { Tag, TagCloseButton, TagLabel } from '@chakra-ui/react';
import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import { fetchBoard } from '../../features/boardSlice';
import authRequest from '../../service/authRequest';
import { useAppDispatch } from '../../store';
import { Member } from '../../type/type';

interface MemberTagProps {
  member: Member;
}

const MemberTag: FC<MemberTagProps> = ({ member }) => {
  const { id } = useParams();

  const dispatch = useAppDispatch();

  const deleteBoardMember = (boardMemberId: number) => {
    authRequest()
      .delete(`board-member/${boardMemberId}`)
      .then(() => {
        dispatch(fetchBoard(id!));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Tag variant="subtle" size="lg" borderRadius="full" colorScheme="teal">
      <TagLabel fontWeight="normal" fontSize="small" lineHeight="taller">
        {member.username}
      </TagLabel>
      <TagCloseButton onClick={() => deleteBoardMember(member.BoardMember.id)} />
    </Tag>
  );
};

export default MemberTag;
