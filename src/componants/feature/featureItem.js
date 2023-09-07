import React from 'react';

function FeatureItem({ imageUrl, imageAlt, title, description }) {
  return (
    <div className="feature-item">
      <img src={imageUrl} alt={imageAlt} className="feature-icon" />
      <h3 className="feature-item-title">{title}</h3>
      <p>{description}</p>
    </div>
  );
}

export default FeatureItem;