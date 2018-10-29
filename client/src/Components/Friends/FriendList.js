import React from 'react';

import './FriendList.css';

const FriendList = props => {
  return (
    <div className="FriendList">
      <div className="FriendList_List">
        {props.user.social &&
          props.user.social.map((object, index) => (
            <div key={index}>{object.name}</div>
          ))}
      </div>
    </div>
  );
};

export default FriendList;
