import React from 'react';
import PropTypes from 'prop-types';

import { labels } from '../Map/countryStyles.js';
import './FriendList.css';

const FriendList = props => {
  let defaultColors = {
    backgroundColor: `${props.background}`,
    color: `${props.color}`,
    fontColor: `${props.fontColor}`,
    borderColor: `${props.borderColor}`
  };

  // Check if props.userFriends exists first because it will be undefined
  // if a country isn't being displayed or the country doesn't have friends
  if (props.userFriends) {
    console.log(props.userFriends);
    const sortedFriends = props.userFriends.sort(
      (a, b) => (a.status > b.status ? -1 : 1)
    );
    console.log(sortedFriends);
  }

  return (
    <div className="FriendList" style={defaultColors}>
      <span className="FriendList__Title">Friends:</span>
      <div className="FriendList__List">
        {props.userFriends
          ? props.userFriends.map((friend, i) => (
              <div key={i}>
                {friend.name} - {labels[friend.status]}
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

FriendList.propTypes = {
  userFriends: PropTypes.array
};

export default FriendList;
