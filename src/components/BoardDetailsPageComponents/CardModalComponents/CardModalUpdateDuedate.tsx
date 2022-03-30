import { format } from 'date-fns';
import { FC } from 'react';
import DatePicker from 'react-datepicker';
import { useParams } from 'react-router-dom';
import { fetchBoard } from '../../../features/boardSlice';
import useCardToast from '../../../hooks/useCardToast';
import authRequest from '../../../service/authRequest';
import { useAppDispatch } from '../../../store';

interface CardModalUpdateDuedateProps {
  cardId: number;
  cardDuedate: string;
}

const CardModalUpdateDuedate: FC<CardModalUpdateDuedateProps> = ({ cardId, cardDuedate }) => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { showToast } = useCardToast();

  let parts: any = cardDuedate.split('-');
  let mydate = new Date(parts[0], parts[1] - 1, parts[2]);

  return (
    <DatePicker
      selected={mydate}
      onChange={(date) => {
        if (!date) return;
        authRequest()
          .put(`card/${cardId}`, { duedate: format(date, 'yyyy-MM-dd') })
          .then(() => {
            dispatch(fetchBoard(id!));
            showToast();
          });
      }}
    />
  );
};

export default CardModalUpdateDuedate;
