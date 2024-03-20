import React from "react";
import PropTypes from "prop-types";
import "./game-card.css";
import { Link } from "react-router-dom";
import { useGetBalance } from "../hooks/useGetBalance";
import { useAccount } from "wagmi";
import { useNetwork } from "wagmi";

const GameCard = ({ name, imageSrc, gameLink, scoreWeight }) => {
  const { address } = useAccount();
  const { chain } = useNetwork();
  const balance = useGetBalance(address);

  return (
    <div className="game-card">
      <img src={imageSrc} alt={name} className="game-image" />
      <div className="game-info">
        <span className="game-name">{name}</span>
      </div>
      {balance >= 10000 && chain?.name === "Polygon Mumbai" ? (
        <Link to="/game" state={{ gameLink, scoreWeight }}>
          <button className="play-button">Play</button>
        </Link>
      ) : (
        <div className="need-tokens">
          You need at least 10000 GTM tokens to play
        </div>
      )}
    </div>
  );
};

GameCard.propTypes = {
  name: PropTypes.string.isRequired,
  imageSrc: PropTypes.string.isRequired,
  gameLink: PropTypes.string.isRequired,
};

export default GameCard;
