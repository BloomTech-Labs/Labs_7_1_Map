import React from 'react';
import { AppContextConsumer } from '../../AppContext';
import CardHeader from './CardHeader';
import BorderBay from '../BorderBay/BorderBay';
import Note from '../Note/Note';
import FriendList from '../Friends/FriendList';

import './Card.css';

const Card = ({ info: { name, emoji } }) => {
  return (
    <div className="Card">
      <CardHeader name={name} flag={emoji} />
      <BorderBay />
      <AppContextConsumer>
        {value => {
          return <Note user={value.AppState.user} />;
        }}
      </AppContextConsumer>
      <AppContextConsumer>
        {value => {
          return <FriendList user={value.AppState.user} />;
        }}
      </AppContextConsumer>
    </div>
  );
};

export default Card;
