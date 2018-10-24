import React from 'react';

import { AppContextConsumer } from '../../AppContext';
import CountryBorder from '../CountryBorder/CountryBorder';
import Note from '../Note/Note';
import FriendList from '../Friends/FriendList';
import CardHeader from './CardHeader';
import BorderBay from '../BorderBay/BorderBay';

// import ReactModal from 'react-modal';

import './Card.css';

const Card = () => {
  return (
    <div className="Card">
      <div className="Card_Header">
        <h2 className="Header_Country-Name">Country Name</h2>
      </div>
      <CountryBorder />
      <AppContextConsumer>
        {value => {
          return <Note user={value.AppState.user} />;
        }}
      </AppContextConsumer>
      <CardHeader />
      <BorderBay />
      <FriendList />
    </div>
  );
};

export default Card;
