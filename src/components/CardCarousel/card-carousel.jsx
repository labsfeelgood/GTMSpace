import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { IconButton } from "@mui/material";
import NavigateBeforeIcon from "../../assets/final/leftarrow.png";
import NavigateNextIcon from "../../assets/final/rightarrow.png";
import Slide from "@mui/material/Slide";
import Stack from "@mui/material/Stack";
import Card from "./card.jsx";
import speedbounceimg from "../../assets/images/SpeedBounce.webp";
import randombounceimg from "../../assets/images/RandomBounce.webp";
import brickbounceimg from "../../assets/images/BrickGame.webp";
import spaceclashimg from "../../assets/images/SpaceClash.webp";
import snakeimg from "../../assets/images/snake.webp";
import pacmanimg from "../../assets/images/pacman.webp";

function Carousel() {
   const games = [
      {
         name: "GTM Clash of Space",
         imageSrc: spaceclashimg,
         gameLink: "https://clash-of-space.netlify.app",
         scoreWeight: 1,
         numberOfStars: 1,
      },
      {
         name: "SpeedBounce",
         imageSrc: speedbounceimg,
         gameLink: "https://speedbouncer.vercel.app",
         scoreWeight: 3,
         numberOfStars: 2,
      },
      {
         name: "RandomBounce",
         imageSrc: randombounceimg,
         gameLink: "https://randombounce.vercel.app",
         scoreWeight: 5,
         numberOfStars: 3,
      },
      {
         name: "BrickBounce",
         imageSrc: brickbounceimg,
         gameLink: "https://brickbounce.vercel.app",
         scoreWeight: 10,
         numberOfStars: 3,
      },
      {
         name: "Snake",
         imageSrc: snakeimg,
         gameLink: "https://snake-game-pi-gilt.vercel.app",
         scoreWeight: 20,
         numberOfStars: 4,
      },
      {
         name: "Pacman",
         imageSrc: pacmanimg,
         gameLink: "https://pacman-theta.vercel.app",
         scoreWeight: 20,
         numberOfStars: 5,
      },
   ];
   // setting the state variables
   // cards will be the cards that are displayed
   // currentPage is the current page of the cards that is currently displayed
   const [currentPage, setCurrentPage] = useState(0);
   // slideDirection is the direction that the cards will slide in
   const [slideDirection, setSlideDirection] = useState("left");

   // cardsPerPage is the number of cards that will be displayed per page
   // you can modify for your needs
   const cardsPerPage = 3;

   // these two functions handle changing the pages
   const handleNextPage = () => {
      setSlideDirection("left");
      setCurrentPage((prevPage) => prevPage + 1);
   };

   const handlePrevPage = () => {
      setSlideDirection("right");
      setCurrentPage((prevPage) => prevPage - 1);
   };

   // This useEffect is really just for demonstration purposes
   // it sets the cards to the duplicateCards array
   // you can remove this and replace it with your own useEffect
   // or if your page is static you can just set the cards to the array
   // at the top of the file

   // this sets the container width to the number of cards per page * 250px
   // which we know because it is defined in the card component
   const containerWidth = cardsPerPage * 500; // 250px per card

   return (
      //  outer box that holds the carousel and the buttons
      <Box
         sx={{
            display: "flex",
            width: "98%",
         }}
      >
         {/* <span className={currentPage === 0 ? "hidden" : "block"}> */}
         <IconButton
            sx={{ top: "0em" }}
            disabled={currentPage === 0}
            onClick={handlePrevPage}
         >
            {/* this is the button that will go to the previous page you can change these icons to whatever you wish*/}
            <img
               className={currentPage === 0 ? "opacity-0" : "opacity-100"}
               src={NavigateBeforeIcon}
               alt=""
            />
         </IconButton>
         {/* </span> */}
         <Box
            sx={{
               width: `${containerWidth}px`,
               height: "120%",
            }}
         >
            {/* this is the box that holds the cards and the slide animation,
        in this implementation the card is already constructed but in later versions you will see how the
        items you wish to use will be dynamically created with the map method*/}
            {games.map((card, index) => (
               <Box
                  key={`card-${index}`}
                  sx={{
                     width: "100%",
                     height: "100%",
                     display: currentPage === index ? "block" : "none",
                  }}
               >
                  {/* this is the slide animation that will be used to slide the cards in and out*/}
                  <Slide direction={slideDirection} in={currentPage === index}>
                     <Stack
                        spacing={4}
                        direction="row"
                        alignContent="center"
                        justifyContent="center"
                        // sx={{ width: "100%", height: "100%" }}
                     >
                        {/* this slices the cards array to only display the amount you have previously determined per page*/}
                        {games
                           .slice(
                              index * cardsPerPage,
                              index * cardsPerPage + cardsPerPage
                           )
                           .map((game, index) => (
                              <Box key={index}>
                                 <Card
                                    name={game.name}
                                    imageSrc={game.imageSrc}
                                    gameLink={game.gameLink}
                                    scoreWeight={game.scoreWeight}
                                    numberOfStars={game.numberOfStars}
                                 />
                              </Box>
                           ))}
                     </Stack>
                  </Slide>
               </Box>
            ))}
         </Box>
         {/* <span
            className={
               currentPage >= Math.ceil((games.length || 0) / cardsPerPage) - 1
                  ? "hidden"
                  : "block"
            }
         > */}
         <IconButton
            sx={{ top: "0em" }}
            disabled={
               currentPage >= Math.ceil((games.length || 0) / cardsPerPage) - 1
            }
            onClick={handleNextPage}
         >
            <img
               className={
                  currentPage >=
                  Math.ceil((games.length || 0) / cardsPerPage) - 1
                     ? "opacity-0"
                     : "opacity-100"
               }
               src={NavigateNextIcon}
               alt=""
            />
         </IconButton>
         {/* </span> */}
      </Box>
   );
}

export default Carousel;
