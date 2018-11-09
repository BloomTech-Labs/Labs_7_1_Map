import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { AppContextConsumer } from '../../AppContext';
import CountryBorder from '../CountryBorder/CountryBorder';
import Note from '../Note/Note';
import FriendList from '../Friends/FriendList';
import './CountryPanel.css';
import themeColors from '../themeColors.js';

const CountryPanel = () => {
  return (
    <AppContextConsumer>
      {value => {
        const currentTheme = value.AppState.user.preferences.theme;
        return value && value.AppState.currentCountry.info ? (
          <div
            style={{
              backgroundColor: themeColors.background[currentTheme],
              color: themeColors.color[currentTheme]
            }}
            className={
              value.AppState.countryPanelIsOpen
                ? 'CountryPanel CountryPanel-open'
                : 'CountryPanel CountryPanel-closed'
            }
          >
            <div className="Card ">
              <div className="Card_Header">
                <span>{value.AppState.currentCountry.info.emoji}</span>
                <h1>{value.AppState.currentCountry.info.name}</h1>
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
              {value.AppState.currentCountry.scratched ? (
                <Note
                  country={value.AppState.currentCountry}
                  handleChangeNote={value.handleChangeNote}
                  handleUpdateNotes={value.handleUpdateNotes}
                  turnOnEditNote={value.turnOnEditNote}
                />
              ) : null}

              <FriendList user={value.AppState.user} />
            </div>
          </div>
        ) : null;
      }}
    </AppContextConsumer>
  );
};

export default CountryPanel;
