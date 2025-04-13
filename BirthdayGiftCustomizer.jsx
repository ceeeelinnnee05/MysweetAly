import React, { useState } from "react";

function BirthdayGiftCustomizer() {
  const [message, setMessage] = useState("Happy Birthday!");
  const [image, setImage] = useState(null);
  const [music, setMusic] = useState(null);
  const [video, setVideo] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMusicUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const musicUrl = URL.createObjectURL(file);
      setMusic(musicUrl);
    }
  };

  const handleVideoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const videoUrl = URL.createObjectURL(file);
      setVideo(videoUrl);
    }
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

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
        />
      </label>
      <br />

      {/* Image Upload */}
      <label>
        Upload an image:
        <input type="file" accept="image/*" onChange={handleImageUpload} />
      </label>
      <br />

      {/* Music Upload */}
      <label>
        Upload background music:
        <input type="file" accept="audio/*" onChange={handleMusicUpload} />
      </label>
      <br />

      {/* Video Upload */}
      <label>
        Upload a short video:
        <input type="file" accept="video/*" onChange={handleVideoUpload} />
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

export default BirthdayGiftCustomizer;// Your component code here