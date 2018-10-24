import React from 'react';
import { AppContextConsumer } from '../../AppContext';
import CardHeader from './CardHeader';
import BorderBay from '../BorderBay/BorderBay';
import Note from '../Note/Note';
import FriendList from '../Friends/FriendList';

import './Card.css';


const names = [{ name: 'nalee' }, { name: 'jon' }, { name: 'thrun' }];

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
      <CardHeader />
      <BorderBay />
      <AppContextConsumer>
        {value => {
          return <FriendList friends={value.AppState.friends} />;
        }}
      </AppContextConsumer>
      {/* <FriendList friends={names} /> */}
      {/* // return (<FriendList friendslist={value.AppState.friends} /> */}
    </div>
  );
};

export default Card;
