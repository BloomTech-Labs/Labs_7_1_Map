import React from 'react';
import PropTypes from 'prop-types';

import { labels } from '../Map/countryStyles.js';
import './FriendList.css';

class FriendList extends React.Component {
  state = {
    friends: this.props.userFriends,
    orderedFriends: []
  };

  render() {
    return (
      <div className="FriendList">
        <span className="FriendList__Title">Friends:</span>
        <div className="FriendList__List">
          {this.props.userFriends
            ? this.props.userFriends.map((friend, i) => (
                <div key={i}>
                  {friend.name} - {labels[friend.status]}
                </div>
              ))
            : null}
        </div>
      </div>
    );
  }
}

FriendList.propTypes = {
  userFriends: PropTypes.array
};

export default FriendList;
