// CameraCapture.jsx
import React, { useRef, useState } from "react";
import Webcam from "react-webcam";

const CameraCapture = ({ onCapture }) => {
  const webcamRef = useRef(null);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    onCapture(imageSrc); // aage ka logic
  };

  return (
    <div className="p-4">
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        className="w-full rounded-lg"
        videoConstraints={{ facingMode: "environment" }} // try "user" if not working
      />
      <button onClick={capture} className="mt-4 px-4 py-2 bg-green-600 text-white rounded">
        Capture
      </button>
    </div>
  );
};

export default CameraCapture;
