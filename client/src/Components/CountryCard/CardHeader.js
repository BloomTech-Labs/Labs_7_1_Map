import React from 'react';

import './CardHeader.css';

const CardHeader = ({ flag, name }) => {
  return (
    <div className="Card_Header">
      <h2 className="Header_Country-Name">
        {flag} {name}
      </h2>
    </div>
  );
};

export default CardHeader;
