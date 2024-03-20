import React from "react";
import "./card.css";
import { Link } from "react-router-dom";
import { useGetBalance } from "../../hooks/useGetBalance.js";
import { useAccount } from "wagmi";
import { useNetwork } from "wagmi";
import Button from "../Button/button.jsx";
import { FaStar } from "react-icons/fa6";
import { useSelector } from "react-redux";
export default function MediaCard({
   name,
   imageSrc,
   gameLink,
   scoreWeight,
   numberOfStars,
}) {
   const { address } = useAccount();
   const { chain } = useNetwork();
   const balance = useSelector((state) => state.balance.value);
   // Function to generate stars
   const renderStars = () => {
      const stars = [];
      for (let i = 0; i < numberOfStars; i++) {
         stars.push(<FaStar />);
      }
      return stars;
   };

   return (
      <div>
         <div>
            <div className="card-74" role="button">
               <img src={imageSrc} alt={name} className="game-image" />
               <div className="game-info">
                  <span className="game-name">{name}</span>
                  <div className="flex items-center justify-center mb-2 text-[#ffd712]">
                     <span className="text-black"> Difficulty:</span>{" "}
                     {renderStars()}
                  </div>
               </div>
               {balance >= 10000 && chain?.name === "Polygon Mumbai" ? (
                  <Link to="/game" state={{ gameLink, scoreWeight }}>
                     <Button text={"Play"} />
                  </Link>
               ) : (
                  <div className="need-tokens">
                     You need at least 10000 GTM tokens to play
                  </div>
               )}
            </div>
         </div>
      </div>
   );
}
