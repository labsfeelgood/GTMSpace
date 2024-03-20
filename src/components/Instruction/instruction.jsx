import React from "react";
import "./instruction.css";
const instruction = () => {
   return (
      <div>
         <div>
            <div class="instruction-container" role="button">
               <div className=" text-center text-[2em] text-[#082c53] ">
                  Get Started!
               </div>
               <div className="flex gap-12 ">
                  <div className="  ">
                     <span className="text-[#ff9829]">1.Connect Wallet</span>
                     <p className="text-[#082c53]">
                        you are eligible to participate in the games only if u
                        hold more than 10000 $GTM tokens
                     </p>
                  </div>
                  <div className="   ">
                     <span className="text-[#258449]">2. Play Game</span>
                     <p className="text-[#082c53]">
                        choose a game of your choice and start playing
                     </p>
                  </div>
                  <div className="">
                     <span className="text-[#ffc518]">
                        3. Rank leaderboard for prizes
                     </span>
                     <p className="text-[#082c53]">
                        Weekly prizes await, ranging from $GTM tokens to
                        exclusive NFTs and merchandise.
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default instruction;
