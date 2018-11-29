import React from 'react';
import PropTypes from 'prop-types';

import { labels } from '../Map/countryStyles.js';
import './FriendList.css';

const FriendList = props => {
  let defaultColors = {
    backgroundColor: props.background,
    color: props.color,
    fontColor: props.fontColor,
    borderColor: props.borderColor
  };

  // Check if props.userFriends exists first because it will be undefined
  // if a country isn't being displayed or the country doesn't have friends
  // or if a user didn't signup with FB
  let sortedFriends = [];
  if (props.userFriends) {
    // Sort the array of friends on a given country so they are grouped by status code
    sortedFriends = props.userFriends.sort(
      // compare function that sorts array in desecending order by status code
      (a, b) => (a.status > b.status ? -1 : 1)
    );
  }

  return (
    <div className="FriendList" style={defaultColors}>
      <span className="FriendList__Title">Friends:</span>
      <div className="FriendList__List">
        {props.userFriends && sortedFriends
          ? sortedFriends.map((friend, i) => (
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
  userFriends: PropTypes.array,
  background: PropTypes.string,
  color: PropTypes.string,
  fontColor: PropTypes.string,
  borderColor: PropTypes.string
};

export default FriendList;
