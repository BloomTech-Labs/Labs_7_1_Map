import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { AppContextConsumer } from '../../AppContext';
import CountryBorder from '../CountryBorder/CountryBorder';
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
                <span>{value.AppState.currentCountry.info.emoji}</span>
                <span>{value.AppState.currentCountry.info.name}</span>
                <FontAwesomeIcon
                  className="closeCountryPanelIcon"
                  onClick={value.closeCountryPanel}
                  icon="times"
                />
              </div>
              <CountryBorder
                geometry={
                  value.currentCountryInfo
                    ? value.currentCountryInfo.geometry
                    : null
                }
                closeCountryPanel={value.closeCountryPanel}
                handleSliderMove={value.handleSliderMove}
                handleScratched={value.handleScratched}
                currentCountryStatus={value.AppState.currentCountryStatus}
                scratched={value.AppState.currentCountry.scratched}
              />
              <Note
                country={value.AppState.currentCountry}
                handleUpdateNotes={value.handleUpdateNotes}
              />
              <FriendList user={value.AppState.user} />
            </div>
          ) : null
        }
      </AppContextConsumer>
    </div>
  );
};

export default CountryPanel;
