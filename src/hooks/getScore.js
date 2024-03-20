import { firestore } from "../firebase/init.js";
import { collection, query, orderBy, limit, getDocs, where, deleteDoc, doc  } from "firebase/firestore";

// Function to get top 10 user scores from Firestore
export async function getUserScores() {
  const scoresCollection = collection(firestore, 'userScores');
  const scoresQuery = query(scoresCollection, orderBy('gameScore', 'desc'), limit(10));
  const scoresSnapshot = await getDocs(scoresQuery);
  
  const userScores = [];
  scoresSnapshot.forEach((doc) => {
    userScores.push(doc.data());
  });
  
  return userScores;
}

export async function getSingleUserScore(walletAddress) {
  const scoresCollection = collection(firestore, 'userScores');
  const scoresQuery = query(scoresCollection, where('walletAddress', '==', walletAddress), limit(1)); // Adjust the limit if you expect multiple scores for the same address
  const scoresSnapshot = await getDocs(scoresQuery);
  
  const userScores = [];
  scoresSnapshot.forEach((doc) => {
    userScores.push(doc.data());
  });
  
  if(userScores.length>0){
    return userScores[0].gameScore;
  }else{
    return 0;
  }
}

export async function deleteSingleUserScore(walletAddress) {
  const scoresCollection = collection(firestore, 'userScores');
  const scoresQuery = query(scoresCollection, where('walletAddress', '==', walletAddress)); // Query documents with the specified walletAddress

  try {
    const scoresSnapshot = await getDocs(scoresQuery); // Retrieve the documents that match the query

    scoresSnapshot.forEach(async (doc) => { // Iterate through the documents
      await deleteDoc(doc.ref); // Delete each document
      console.log(`Document with ID ${doc.id} deleted successfully.`);
    });

    return true; // Return true indicating successful deletion
  } catch (error) {
    console.error("Error deleting document:", error);
    return false; // Return false indicating deletion failure
  }
}