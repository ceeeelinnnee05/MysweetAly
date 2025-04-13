import React, { useState, useEffect } from "react";

function BirthdayGiftCustomizer() {
  const [message, setMessage] = useState("Happy Birthday!");
  const [image, setImage] = useState(null);
  const [music, setMusic] = useState(null);
  const [video, setVideo] = useState(null);

  // Handle image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) { // Limit size to 10MB
        alert("Image size should not exceed 10MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle music upload
  const handleMusicUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 15 * 1024 * 1024) { // Limit size to 15MB
        alert("Music file size should not exceed 15MB.");
        return;
      }
      const musicUrl = URL.createObjectURL(file);
      setMusic(musicUrl);
    }
  };

  // Handle video upload
  const handleVideoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 50 * 1024 * 1024) { // Limit size to 50MB
        alert("Video file size should not exceed 50MB.");
        return;
      }
      const videoUrl = URL.createObjectURL(file);
      setVideo(videoUrl);
    }
  };

  // Handle message change
  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  // Cleanup URLs for music and video on component unmount
  useEffect(() => {
    return () => {
      if (music) URL.revokeObjectURL(music);
      if (video) URL.revokeObjectURL(video);
    };
  }, [music, video]);

  return (
    <div className="birthday-gift-customizer">
      <h1>Birthday Gift Customizer</h1>

      {/* Message Input */}
      <label>
        Enter a custom message:
        <input
          type="text"
          value={message}
          onChange={handleMessageChange}
          placeholder="Enter your birthday message"
          aria-label="Enter your custom birthday message"
        />
      </label>
      <br />

      {/* Image Upload */}
      <label>
        Upload an image:
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleImageUpload} 
          aria-label="Upload an image file"
        />
      </label>
      <br />

      {/* Music Upload */}
      <label>
        Upload background music:
        <input 
          type="file" 
          accept="audio/*" 
          onChange={handleMusicUpload} 
          aria-label="Upload an audio file"
        />
      </label>
      <br />

      {/* Video Upload */}
      <label>
        Upload a short video:
        <input 
          type="file" 
          accept="video/*" 
          onChange={handleVideoUpload} 
          aria-label="Upload a video file"
        />
      </label>
      <div className="preview">
        {/* Preview Section */}
        <h2>Preview</h2>
        <p>{message}</p>
        {image && <img src={image} alt="Uploaded" style={{ maxWidth: "300px", marginTop: "10px" }} />}
        {music && (
          <audio controls style={{ marginTop: "10px" }}>
            <source src={music} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        )}
        {video && (
          <video controls style={{ maxWidth: "500px", marginTop: "10px" }}>
            <source src={video} type="video/mp4" />
            Your browser does not support the video element.
          </video>
        )}
      </div>
    </div>
  );
}

export default BirthdayGiftCustomizer;