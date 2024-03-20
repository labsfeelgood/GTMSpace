import React from "react";
import { Link } from "react-router-dom";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Logo from "../assets/images/logo.png";
import playImg from "../assets/final/play_games.png";
import earnImg from "../assets/final/earn.png";
import Button from "./Button/button";
import CardCarousel from "./CardCarousel/card-carousel";
import Instruction from "./Instruction/instruction";
import TableComponent from "./leaderboard";
import "./homefinal.css";
import { useProvider } from "wagmi";
import { Contract } from "ethers";
import { contractABI } from "../utils/contractABI.js";
import { ethers } from "ethers";
import { useNetwork } from "wagmi";
import { useGetBalance } from "../hooks/useGetBalance";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setBalance } from "../features/balanceSlice.js";
const HomeFinalPage = () => {
   const provider = useProvider();
   const { address } = useAccount();
   const { chain } = useNetwork();
   const [isConnected, setIsConnected] = useState(false);
   const dispatch = useDispatch();
   const _balance = useSelector((state) => state.balance.value);
   useEffect(() => {
      if (provider) {
         (async () => {
            try {
               const contract = new Contract(
                  process.env.REACT_APP_CONTRACT,
                  contractABI,
                  provider
               );
               const balanceInWei = await contract.balanceOf(address);
               const balance = ethers.utils.formatEther(balanceInWei);
               dispatch(setBalance(Math.floor(balance)));
            } catch (error) {
               console.log("Error");
            }
         })();
      }
      // Check if the account address is available
      if (address) {
         console.log("Account Address:", address);
         console.log("Balance:", _balance);
         setIsConnected(true);
      } else {
         console.log("No account connected.");
         setIsConnected(false);
         dispatch(setBalance(0));
      }
   }, [address, _balance]); // Ru
   return (
      <>
         {/* home page */}
         <div
            id="homepage"
            className="home-container flex flex-col justify-between"
         >
            {/* Navbar section */}
            <nav className="flex justify-between gap-10 bg-red-30 p-3">
               <div className=" flex justify-center p-3 ">
                  <Link to="/">
                     <img
                        src={Logo}
                        alt="Morty Logo"
                        className=" max-w-[8em] xl:max-w-[9em] 2xl:max-w-[10em] h-auto"
                     />
                  </Link>
               </div>
               <div className=" flex items-center    ">
                  <ul className="flex flex-wrap gap-1 xl:gap-3 2xl:gap-8 text-white">
                     <li>
                        <a
                           className="text-[0.75em] xl:text-[0.85em] 2xl:text-[1em] "
                           href="#homepage"
                        >
                           Home
                        </a>
                     </li>
                     <li>
                        <a
                           className="text-[0.75em] xl:text-[0.85em] 2xl:text-[1em] "
                           href="#leaderboard"
                        >
                           Leaderboard
                        </a>
                     </li>
                     <li>
                        <a
                           className="text-[0.75em] xl:text-[0.85em] 2xl:text-[1em] "
                           href="#gamepage"
                        >
                           Arcade
                        </a>
                     </li>
                     <li>
                        <a
                           className="text-[0.75em] xl:text-[0.85em] 2xl:text-[1em]"
                           href="#"
                        >
                           News
                        </a>
                     </li>
                     <li>
                        <a
                           className="text-[0.75em] xl:text-[0.85em] 2xl:text-[1em] "
                           href="#aboutpage"
                        >
                           About GTM
                        </a>
                     </li>
                  </ul>
               </div>
               <div className="  flex justify-center gap-2 xl:gap-5 items-center">
                  {isConnected ? (
                     _balance >= 0 ? (
                        chain?.name === "Polygon Mumbai" ? (
                           <div className=" bg-white flex items-center gap-1 p-1 xl:gap-2 xl:p-2 rounded-lg ">
                              <p className=" text-xl font-semibold overflow-hidden">
                                 {_balance <= 9999
                                    ? _balance
                                    : `${(_balance / 1000).toFixed(1)}k`}
                                 GTM
                              </p>
                              <img
                                 className=" opacity-100  xl:scale-125 "
                                 src="mars-logo.png"
                                 alt="Girl in a jacket"
                              />
                           </div>
                        ) : null
                     ) : (
                        <div class="loader">
                           <span></span>
                           <span></span>
                           <span></span>
                        </div>
                     )
                  ) : null}
                  <div className=" cursor-pointer ">
                     <ConnectButton showBalance={false} chainStatus="icon" />
                  </div>
               </div>
            </nav>
            <div className="max-w-auto">
               <img
                  src={playImg}
                  alt=""
                  className=" ml-[9rem] max-w-[45em] xl:ml-[10rem] xl:mt-[2em] xl:max-w-[50em] 2xl:max-w-[60em] "
               />
               <img
                  src={earnImg}
                  alt=""
                  className=" ml-[9rem] max-w-[40em] xl:ml-[10rem]   xl:max-w-[45em] 2xl:max-w-[55em]"
               />
               <div className="ml-[10rem] mt-2 xl:ml-[11rem] xl:mt-3 2xl:">
                  <a href="#gamepage">
                     <Button text="Play Now" />
                  </a>
               </div>
            </div>
            <div className=" p-10 text-center">
               <Instruction />
            </div>
         </div>

         {/* gamepage and about page */}
         <div className="game-about-container">
            <div id="gamepage" className="gamepage-container">
               <div className="h-auto w-auto ">
                  <header className="text-white text-[3rem] xl:text-[5rem] text-center p-9">
                     Choose your game
                  </header>
                  <div className=" flex justify-center items-center mt-4 ">
                     <CardCarousel />
                  </div>
                  <a href="#homepage"> </a>
               </div>
            </div>
            {/* about page */}
            <div id="aboutpage" className="aboutpage-container">
               <div className=" max-w-[70%] mt-[30em] ml-14 min-h-[40em]  ">
                  <header className="text-white text-[5rem] ">About GTM</header>
                  <p className=" text-white text-wrap leading-[2.5em] text-[1.5rem] fone">
                     <span className=" "> $GTM ARCADE </span> <br /> Welcome to
                     GTM Arcade - Your Ultimate Gaming Destination! Are you a
                     passionate gamer seeking rewards for your gaming prowess?
                     Look no further, because GTM Arcade is your home for
                     immersive gaming experiences and exciting rewards!
                     <br /> <span className=" ">
                        {" "}
                        What We Offer:
                     </span> <br /> Weekly Game Additions: Dive into new gaming
                     adventures every week, keeping the excitement fresh and
                     your adrenaline pumping. Connect Your Wallet: Seamlessly
                     connect your digital wallet and start earning rewards as
                     you play. Compete on Leaderboards: Test your skills and
                     climb the leaderboard ranks. Weekly prizes await, ranging
                     from $GTM tokens to exclusive NFTs and merchandise.
                  </p>
               </div>
            </div>
         </div>

         {/* Leaderboard page */}
         <div id="leaderboard" className="leaderboard-container">
            <div className=" max-w-auto border border-red-400 flex justify-center  h-[100%] ">
               <TableComponent />
            </div>
         </div>
      </>
   );
};

export default HomeFinalPage;
