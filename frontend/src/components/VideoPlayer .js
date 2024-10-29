import React from 'react';

const VideoPlayer = ({ videoSrc }) => {
  return (
    <div style={{ maxWidth: '600px', margin: 'auto' }}>
      <video
        controls
        style={{ width: '100%', height: 'auto' }}
        src={videoSrc}
        type="video/mp4"
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;
