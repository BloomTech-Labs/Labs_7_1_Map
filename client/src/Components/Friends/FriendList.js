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
  // const sortedFriends = [props.userFriends].sort(function(a, b) {
  //   if (a < b) {
  //     return -1;
  //   }
  //   if (a > b) {
  //     return 1;
  //   }
  //   return 0;
  // });
  // console.log([props.userFriends].sort());
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
