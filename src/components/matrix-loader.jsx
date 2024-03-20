import React, { useEffect,useRef } from "react";

const MatrixLoader = ({ isScoreAvailable, isScoreHigh }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (isScoreAvailable && isScoreHigh) {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      let requestId;

      // Making the canvas full screen
      canvas.height = window.innerHeight;
      canvas.width = window.innerWidth;

      // Characters used in the Matrix effect
      const matrixChars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      const charsArray = matrixChars.split("");

      const fontSize = 10;
      const columns = canvas.width / fontSize; // Number of columns for the rain
      const rainDrops = [];

      // X below is the x coordinate
      // 1 = y-coordinate of the drop(same for every drop initially)
      for (let x = 0; x < columns; x++) rainDrops[x] = 1;

      // Drawing the characters
      function draw() {
        // Black BG for the canvas
        // Translucent BG to show trail
        ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "#0F0"; // Green text
        ctx.font = fontSize + "px monospace";

        // Looping over drops
        for (let i = 0; i < rainDrops.length; i++) {
          // A random character to print
          const text =
            charsArray[Math.floor(Math.random() * charsArray.length)];
          // X = i*fontSize, Y = value of drops[i]*fontSize
          ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

          // Sending the drop back to the top randomly after it has crossed the screen
          // Adding a randomness to the reset to make the drops scattered on the Y axis
          if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975)
            rainDrops[i] = 0;

          // Incrementing Y coordinate
          rainDrops[i]++;
        }
        requestId = requestAnimationFrame(draw);
      }

      draw();

      return () => {
        cancelAnimationFrame(requestId);
      };
    }
  }, [isScoreAvailable, isScoreHigh]);
  return (
    <>
      <canvas
        ref={canvasRef}
        id="matrixCanvas"
        style={{
          position: "absolute",
          opacity: 0.5,
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
          zIndex: 990,
        }}
      />
    </>
  );
};

export default MatrixLoader;
