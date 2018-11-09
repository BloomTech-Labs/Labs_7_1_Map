import React from 'react';
import './Legend.css';
import { colorPalette } from '../Map/countryStyles.js';
import themeColors from '../themeColors.js';
import { AppContextConsumer } from '../../AppContext.js';

const Legend = () => {
  return (
    <AppContextConsumer>
      {value => {
        const currentTheme =
          value && value.AppState.user.preferences
            ? value.AppState.user.preferences.theme
            : 'standard';
        return (
          <div
            className="Legend"
            style={{
              backgroundColor: themeColors.background[currentTheme],
              color: themeColors.color[currentTheme]
            }}
          >
            <div className="Legend__Wishlist">
              <span
                className="Wishlist__purple"
                style={{ backgroundColor: colorPalette[1] }}
              />
              Wishlist
            </div>
            <div className="Legend__Transited">
              <span
                className="Transited__yellow"
                style={{ backgroundColor: colorPalette[2] }}
              />
              Transited
            </div>
            <div className="Legend__Visited">
              <span
                className="Visited__red"
                style={{ backgroundColor: colorPalette[3] }}
              />
              Visited
            </div>
            <div className="Legend__Lived">
              <span
                className="Lived__blue"
                style={{ backgroundColor: colorPalette[4] }}
              />
              Lived
            </div>
          </div>
        );
      }}
    </AppContextConsumer>
  );
};

export default Legend;
