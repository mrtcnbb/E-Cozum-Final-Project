import { format } from 'date-fns';
import { FC, useState } from 'react';
import DatePicker from 'react-datepicker';
import { useParams } from 'react-router-dom';
import { fetchBoard } from '../../../features/boardSlice';
import useCardToast from '../../../hooks/useCardToast';
import authRequest from '../../../service/authRequest';
import { useAppDispatch } from '../../../store';

interface CardModalDuedateProps {
  cardId: number;
}

const CardModalDuedate: FC<CardModalDuedateProps> = ({ cardId }) => {
  const [startDate, setStartDate] = useState(new Date());
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { showToast } = useCardToast();

  return (
    <DatePicker
      selected={startDate}
      onChange={(date) => {
        if (!date) return;
        setStartDate(date);
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

export default CardModalDuedate;
