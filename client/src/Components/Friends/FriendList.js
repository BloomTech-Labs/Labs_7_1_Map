import React from 'react';

import { AppContextConsumer } from '../../AppContext';
import './FriendList.css';

const FriendList = props => {
  return (
    <AppContextConsumer>
      {value => (
        <div className="FriendList">
          <div className="FriendList_List">
            {value.AppState.currentCountry.friends
              ? value.AppState.currentCountry.friends.map((friend, i) => (
                  <div key={i}>
                    {friend.name} - {friend.status}
                  </div>
                ))
              : null}
          </div>
        </div>
      )}
    </AppContextConsumer>
  );
};

export default FriendList;
