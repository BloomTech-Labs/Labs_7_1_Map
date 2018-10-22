import React from 'react';
import CardHeader from './CardHeader';
import CountryBorder from '../CountryBorder/CountryBorder';
import VisitBay from '../VisitBay/VisitBay';
import Note from '../Note/Note';
import FriendList from '../Friends/FriendList';

import './Card.css';

const Card = () => {
  return (
    <div className="Card">
      <CardHeader />
      <CountryBorder />
      <VisitBay />
      <Note />
      <FriendList />
    </div>
  );
};

export default Card;
