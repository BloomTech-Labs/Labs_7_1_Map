import React from 'react';
import PropTypes from 'prop-types';

import { AppContextConsumer } from '../../AppContext';
import './FriendList.css';

const FriendList = props => {
  return (
    <AppContextConsumer>
      {value => (
        <div className="FriendList">
          <div className="FriendList_List">
            {value.AppState.friends
              ? value.AppState.friends.map((friend, i) => (
                  <div key={i}>{friend.name}</div>
                ))
              : null}
          </div>
        </div>
      )}
    </AppContextConsumer>
  );
};

FriendList.propTypes = {
  user: PropTypes.object
};

export default FriendList;
