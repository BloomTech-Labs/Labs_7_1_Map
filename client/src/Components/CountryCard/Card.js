import React from 'react';
import CardHeader from './CardHeader';
import BorderBay from '../BorderBay/BorderBay';
import Note from '../Note/Note';
import FriendList from '../Friends/FriendList';

import './Card.css';

const Card = () => {
  return (
    <div className="Card">
      <CardHeader />
      <BorderBay />
      <Note />
      <FriendList />
    </div>
  );
};

export default Card;
