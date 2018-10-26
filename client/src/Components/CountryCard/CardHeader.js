import React from 'react';

import './CardHeader.css';

const CardHeader = props => {
  return (
    <div className="Card_Header">
      <h2 className="Header_Country-Name">
        {props.flag} {props.name}
      </h2>
    </div>
  );
};

export default CardHeader;
