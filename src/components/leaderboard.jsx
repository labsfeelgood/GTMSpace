import { useEffect, useState } from "react";
import { getUserScores } from "../hooks/getScore.js";
import "./leaderboard.css";

const TableComponent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const scores = await getUserScores();
        setData(scores);
      } catch (error) {
        console.error("Error fetching user scores:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="container">
        <h1>Leaderboard</h1>
        <div className="outerTable">
          <table>
            <thead>
              <tr>
                <th>S/No</th>
                <th>Wallet</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.walletAddress}</td>
                    <td>{item.gameScore}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td></td>
                  <td>Loading....</td>
                  <td></td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default TableComponent;
