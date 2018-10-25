import React from 'react';

import './FriendList.css';

const FriendList = props => {
  return (
    <div className="FriendList">
      <div className="FriendList_List">
        {props.friends.map((object, index) => {
          if (index <= 5) {
            return <div key={index}>{object.name}</div>;
          }
        })}
      </div>
    </div>
  );
};

export default FriendList;
