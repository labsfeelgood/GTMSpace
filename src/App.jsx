import "@rainbow-me/rainbowkit/styles.css";
import { Suspense, lazy } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import Loader from "./components/Loader.jsx";
import { useEffect } from "react";
import { useAccount } from "wagmi";
import { useMediaQuery } from "react-responsive";
import MobileApp from "./components/MobileApp.jsx";

const Home = lazy(() => import("./pages/home.jsx"));
const Game = lazy(() => import("./pages/game.jsx"));
const NotFound = lazy(() => import("./pages/not-found.jsx"));
const App = () => {
   const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

   useEffect(() => {
      window.ethereum.on("accountsChanged", function (accounts) {
         console.log("Ethereum accounts changed:", accounts);
         window.location.reload();
      });

      window.ethereum.on("networkChanged", function (networkId) {
         console.log("Ethereum network changed:", networkId);
         window.location.reload();
      });

      return () => {
         window.ethereum.removeAllListeners("accountsChanged");
         window.ethereum.removeAllListeners("networkChanged");
      };
   }, []);

   const accountInfo = useAccount({
      onConnect: ({ address, connector, isReconnected }) => {
         console.log("Connected", { address, connector, isReconnected });
      },
      onDisconnect: () => {
         console.error("Disconnected");
      },
   });

   return (
      <>
         {isMobile ? (
            <MobileApp />
         ) : (
            <Router>
               <Suspense fallback={<Loader />}>
                  <Routes>
                     <Route path="/" element={<Home />} />
                     {/* <Route path="/home" element={<Home />} /> */}
                     <Route path="/game" element={<Game />} />
                     <Route path="*" element={<NotFound />} />
                  </Routes>
               </Suspense>
            </Router>
         )}
      </>
   );
};

export default App;