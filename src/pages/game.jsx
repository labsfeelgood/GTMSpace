import React, { useEffect } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useLocation } from "react-router-dom";
import { addUserScore } from "../hooks/setScore.js";
import { HashLink } from "react-router-hash-link";
import {
   getSingleUserScore,
   deleteSingleUserScore,
} from "../hooks/getScore.js";
import "./game.css";
import { useGetBalance } from "../hooks/useGetBalance";
import { useAccount } from "wagmi";
const GamePage = () => {
   const location = useLocation();
   const { gameLink, scoreWeight } = location.state;
   const { address } = useAccount();
   const GameID = 1;
   const balance = useGetBalance(address);

   // if(address==null||balance<10000){
   //   alert("Ineligible to play")
   // }

   useEffect(() => {
      const handleMessage = async (event) => {
         console.log("Event:", event);
         // Check if the message is from the iframe
         if (event.origin !== gameLink) {
            console.log(
               "Received message from untrusted origin:",
               event.origin
            );
            return; // Ignore messages from untrusted origins
         }
         console.log("Received message from trusted origin:", event.origin);
         console.log("INITIALISED");
         // if(address==null||balance<10000){
         //   alert("Ineligible to play")
         // }

         // Check if the message contains score data
         // console.log("Received score from iframe:", event.data.score);

         const scoreData = event.data.score;
         if (scoreData !== undefined) {
            // Log the received score
            console.log("Received score from iframe:", scoreData);
            if (scoreData > 0) {
               let prevScore = await getSingleUserScore(address);
               // let prevScore = 0;
               console.log("Prev score found ", prevScore);
               let finalScore = scoreData * scoreWeight;
               if (prevScore < finalScore) {
                  await deleteSingleUserScore(address);
                  await addUserScore(GameID, address, finalScore);
               } else {
                  console.log("Not a highest score");
               }
            }
         } else {
            console.log("Received message from iframe:", event.data); // Log the entire message for debugging
         }
      };

      // Add event listener to listen for messages from the iframe
      window.addEventListener("message", handleMessage);

      // Clean up event listener on component unmount
      return () => {
         window.removeEventListener("message", handleMessage);
      };
   }, []);
   return (
      <>
         <div className="game-page-container">
            <HashLink to="/#gamepage">
               <div className="back-button">
                  <img src="back.svg" className="icon" alt="" />
               </div>
            </HashLink>
            <iframe className="game-iframe" title="Game" src={gameLink} />
         </div>
      </>
   );
};

export default GamePage;
