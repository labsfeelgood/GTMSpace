import React from "react";
import GameCard from "../components/game-card";
import "./game-page.css";
import speedbounceimg from "../assets/images/SpeedBounce.webp";
import randombounceimg from "../assets/images/RandomBounce.webp";
import brickbounceimg from "../assets/images/BrickGame.webp";
import spaceclashimg from "../assets/images/SpaceClash.webp";
import snakeimg from "../assets/images/snake.webp"
import pacmanimg from "../assets/images/pacman.webp"
const GamePage = () => {
  const games = [
    {
      name: "GTM Clash of Space",
      imageSrc: spaceclashimg,
      gameLink: "https://clash-of-space.netlify.app",
      scoreWeight: 1,
    },
    {
      name: "SpeedBounce",
      imageSrc: speedbounceimg,
      gameLink: "https://speedbouncer.vercel.app",
      scoreWeight: 3,
    },
    {
      name: "RandomBounce",
      imageSrc: randombounceimg,
      gameLink: "https://randombounce.vercel.app",
      scoreWeight: 5,
    },
    {
      name: "BrickBounce",
      imageSrc: brickbounceimg,
      gameLink: "https://brickbounce.vercel.app",
      scoreWeight: 10,
    },
    {
      name: "Snake",
      imageSrc: snakeimg,
      gameLink: "https://snake-game-pi-gilt.vercel.app",
      scoreWeight: 20,
    },
    {
      name: "Pacman",
      imageSrc: pacmanimg,
      gameLink: "https://pacman-theta.vercel.app",
      scoreWeight: 20,
    },
  ];

  return (
    <div className="game-page">
      {games.map((game, index) => (
        <GameCard
          key={index}
          name={game.name}
          imageSrc={game.imageSrc}
          gameLink={game.gameLink}
          scoreWeight={game.scoreWeight}
        />
      ))}
    </div>
  );
};

export default GamePage;
