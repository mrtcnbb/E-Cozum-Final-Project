import { format } from 'date-fns';
import { FC, useState } from 'react';
import DatePicker from 'react-datepicker';
import { useParams } from 'react-router-dom';
import { fetchBoard } from '../../features/boardSlice';
import authRequest from '../../service/authRequest';
import { useAppDispatch } from '../../store';

interface ModalDuedateProps {
  cardId: number;
}

const ModalDuedate: FC<ModalDuedateProps> = ({ cardId }) => {
  const [startDate, setStartDate] = useState(new Date());
  const { id } = useParams();
  const dispatch = useAppDispatch();

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
          });
      }}
    />
  );
};

export default ModalDuedate;
