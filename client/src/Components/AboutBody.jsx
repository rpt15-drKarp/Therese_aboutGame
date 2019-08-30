import React from 'react';

const AboutBody = (props) => {
  return (
    <div>
      <h3 className= 'aboutThisGameHeading'> ABOUT THIS GAME </h3>
      <div className = 'aboutThisGameFirstSentence'>{props.aboutHeader}</div>
        <img src={'https://steamcdn-a.akamaihd.net/steam/apps/413150/extras/animalStrip2.png?t=1560555132'} className="bannerImg" />
        <div className='aboutThisGameBody'><span>{props.aboutBody}</span></div>
      </div>
      )
  };
  
export default AboutBody;