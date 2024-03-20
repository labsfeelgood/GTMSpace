import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "./polyfills";
import {
   RainbowKitProvider,
   darkTheme,
   getDefaultWallets,
} from "@rainbow-me/rainbowkit";
import { store } from "./store.js";
import { Provider } from "react-redux";
import { configureChains, createClient, mainnet, WagmiConfig } from "wagmi";
import { polygonMumbai } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import { metaMaskWallet } from "@rainbow-me/rainbowkit/wallets";
// import { createConfig } from 'wagmi';
const { chains, provider, webSocketProvider } = configureChains(
   [Number(process.env.REACT_APP_IS_MAINNET) ? mainnet : polygonMumbai],
   [
      alchemyProvider({ apiKey: process.env.REACT_APP_ALCHEMY_API }),
      publicProvider(),
   ]
);

// const connector = connectorsForWallets(
//    [
//       {
//          groupName: "Recommended",
//          wallets: [metaMaskWallet],
//       },
//    ],
//    { appName: "RainbowKit App", projectId: "YOUR_PROJECT_ID" }
// );

// const config = createConfig({
//    connector,
// });

const { connectors } = getDefaultWallets({
   appName: "GTMSpace",
   chains,
});

const wagmiClient = createClient({
   autoConnect: true,
   connectors,
   provider,
   webSocketProvider,
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
   <React.StrictMode>
      <WagmiConfig client={wagmiClient}>
         <RainbowKitProvider
            coolMode
            theme={darkTheme({ accentColor: "#377bff" })}
            chains={chains}
         >
            <QueryClientProvider client={new QueryClient()}>
               <Provider store={store}>
                  <App />
               </Provider>
            </QueryClientProvider>
         </RainbowKitProvider>
      </WagmiConfig>
   </React.StrictMode>
);
