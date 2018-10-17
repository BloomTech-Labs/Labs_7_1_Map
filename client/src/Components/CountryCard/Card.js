import React from 'react';
import CountryBorder from '../CountryBorder/CountryBorder';
import Slider from '../Slider/Slider';
import Note from '../Note/Note';
import FriendList from '../Friends/FriendList';
// import ReactModal from 'react-modal';

import './Card.css';

const Card = () => {
  return (
    <div className="Card">
      <img src="#" alt="flag" className="Card_Country-Flag" />
      <h2 className="Card_Country-Name">Country Name</h2>
      <CountryBorder />
      <Slider />
      <Note />
      <FriendList />
    </div>
  );
};

export default Card;
