import React from 'react';
import { AppContextConsumer } from '../../AppContext';
import Card from './Card';
import './CountryPanel.css';

const CountryPanel = () => {
  return (
    <div className="CountryPanel">
      <AppContextConsumer>
        {value => (
          <React.Fragment>
            {value && value.AppState.countryPanelIsOpen ? (
              <Card open={value.AppState.countryPanelIsOpen} />
            ) : (
              ''
            )}
          </React.Fragment>
        )}
      </AppContextConsumer>
    </div>
  );
};

export default CountryPanel;
