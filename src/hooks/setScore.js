import { firestore } from "../firebase/init.js";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
// Add a second document with a generated ID.
import { addDoc } from "firebase/firestore"; 
// Function to add a user's score to Firestore
export async function addUserScore(gameId, wallet, gameScore) {
    try {
      const scoresCollection = collection(firestore, 'userScores');
      await addDoc(scoresCollection, {
        gameId:gameId,
        walletAddress:wallet,
        gameScore: gameScore,
        timestamp: new Date() // Optional: Add a timestamp for when the score was added
      });
      console.log("User score added successfully");
    } catch (error) {
      console.error("Error adding user score: ", error);
    }
  }