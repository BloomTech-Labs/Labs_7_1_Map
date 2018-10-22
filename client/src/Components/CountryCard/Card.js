import React from 'react';
import CardHeader from './CardHeader';
import BorderBay from '../BorderBay/BorderBay';
// import VisitBay from '../VisitBay/VisitBay';
import Note from '../Note/Note';
import FriendList from '../Friends/FriendList';

import './Card.css';

const Card = () => {
  return (
    <div className="Card">
      <CardHeader />
      <BorderBay />
      {/* <VisitBay /> */}
      <Note />
      <FriendList />
    </div>
  );
};

export default Card;
