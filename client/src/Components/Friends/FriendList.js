import React, { Component } from 'react';

import './FriendList.css';

class FriendList extends Component {
  state = {
    friends: []
  };

  render() {
    return (
      <div className="FriendList">
        <div className="FriendList_List">
          <ul>
            {this.props.friends.map(function(object, index) {
              return <li key={index}>{object.name}</li>;
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default FriendList;
