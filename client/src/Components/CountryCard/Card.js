import React from 'react';

import { AppContextConsumer } from '../../AppContext';
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
        <h2 className="Header_Country-Name">Country Name</h2>
      </div>
      <CountryBorder />
      <VisitedBay />
      <AppContextConsumer>
        {value => {
          return <Note user={value.AppState.user} />;
        }}
      </AppContextConsumer>
      <FriendList />
    </div>
  );
};

export default Card;
