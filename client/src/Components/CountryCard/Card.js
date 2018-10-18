import React from 'react';
import CountryBorder from '../CountryBorder/CountryBorder';
import VisitedBay from '../VisitedBay/VisitedBay';
import Note from '../Note/Note';
import FriendList from '../Friends/FriendList';
// import ReactModal from 'react-modal';

import './Card.css';

const Card = () => {
  return (
    <div className="Card">
      <div className="Card_Header">
        <img src="#" alt="flag" className="Header_Country-Flag" />
        <h2 className="Header_Country-Name">Country Name</h2>
      </div>
      <CountryBorder />
      <VisitedBay />
      <Note />
      <FriendList />
    </div>
  );
};

export default Card;
