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
          {this.props.friends.map(function(object, index) {
            if (index <= 5) {
              return <div key={index}>{object.name}</div>;
            }
          })}
        </div>
      </div>
    );
  }
}

export default FriendList;
