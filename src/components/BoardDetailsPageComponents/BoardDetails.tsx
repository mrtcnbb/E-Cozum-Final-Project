import { FC } from 'react';
import { useParams } from 'react-router-dom';

const BoardDetails: FC = () => {
  const { id } = useParams();
  return <div>board id{id}</div>;
};

export default BoardDetails;
