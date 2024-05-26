import React from 'react';

const Card = ({ title, description }) => {
  return (
    <div>
      <div className="card">
        <div style={{ fontWeight: 'bold' }}>{title}</div>
        <div style={{ fontStyle: 'italic' }}>{description}</div>
      </div>
    </div>
  );
};

export default Card;
