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
      <AppContextConsumer>
        {value => (
          <React.Fragment>
            <div className="Card_Header">
              <h2 className="Header_Country-Name">Country name</h2>
            </div>
            <BorderBay />
            <Note user={value.AppState.user} />
            <FriendList friends={value.AppState.friends} />
          </React.Fragment>
        )}
      </AppContextConsumer>
    </div>
  );
};

export default Card;
