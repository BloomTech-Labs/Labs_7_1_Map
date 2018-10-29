import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { AppContextConsumer } from '../../AppContext';
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
              <div className="Header_Country-Name">
                <span>{value.AppState.currentCountry.info.emoji}</span>
                <span>{value.AppState.currentCountry.info.name}</span>
              </div>
              <FontAwesomeIcon
                className="closeCountryPanelIcon"
                onClick={value.toggleCountryPanel}
                icon="times"
              />
            </div>
            <BorderBay />
            <Note user={value.AppState.user} />
            <FriendList user={value.AppState.user} />
          </React.Fragment>
        )}
      </AppContextConsumer>
    </div>
  );
};

export default Card;
