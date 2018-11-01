import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { AppContextConsumer } from '../../AppContext';
import BorderBay from '../BorderBay/BorderBay';
import Note from '../Note/Note';
import FriendList from '../Friends/FriendList';
import './CountryPanel.css';

const CountryPanel = () => {
  return (
    <div className="CountryPanel">
      <AppContextConsumer>
        {value =>
          value && value.AppState.countryPanelIsOpen ? (
            <div className="Card ">
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
              <BorderBay handleSliderMove={value.handleSliderMove} />
              <Note user={value.AppState.user} />
              <FriendList user={value.AppState.user} />
            </div>
          ) : null
        }
      </AppContextConsumer>
    </div>
  );
};

export default CountryPanel;
