import React from 'react';

const Features = (props) => {
  var mappedList = props.features.map((elem, i, j) => {
    return (
      <li key={i}>
        <strong  key={j}>{elem.featureTitle}</strong>
        <div className="feature" key={i}>{elem.features}</div>
      </li>

    )
  })
  return (
    <div>
    <strong className='featuresHeader'> Features </strong>
      <ul>

        <div > {mappedList}</div>

      </ul>
      </div>

  )
};

export default Features;