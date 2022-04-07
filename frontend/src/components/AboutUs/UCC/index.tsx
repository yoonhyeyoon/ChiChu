import React from 'react';
import ReactPlayer from 'react-player';

function UCC() {
  return (
    <ReactPlayer
      url="videos/UCC_intro.MP4"
      width="100%"
      height="100%"
      controls={true}
    />
  );
}

export default UCC;
