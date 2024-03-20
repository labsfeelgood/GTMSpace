import { useProvider } from "wagmi";
import { useState, useEffect } from "react";
import { Contract } from "ethers";
import { contractABI } from "../utils/contractABI.js";
import { ethers } from "ethers";
export function useGetBalance(address) {
  const provider = useProvider();
  const [balance, setBalance] = useState("");
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
              const balance = ethers.utils.formatEther(balanceInWei)
              setBalance(balance);
            } catch (error) {
              console.log("Error");
            }
          })(); 
    }
  }, [provider]);
  return balance;
}
