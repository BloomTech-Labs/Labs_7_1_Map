import React from 'react';
import { AppContextConsumer } from '../../AppContext';
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
