import React from 'react'
import "./info-page.css"

const StepCard = ({ stepNumber, description }) => {
  return (
    <div className="step-card">
      <h3>STEP {stepNumber}</h3>
      <div className="red-line"></div>
      <p>{description}</p>
    </div>
  );
};

const InfoPage = () => {
  return (
    <>
    <div className="container">
    <header className="header">
      <h1>Welcome to GTM Space Station</h1>
      <p>
        Embark on an Interstellar Adventure! Explore a universe of captivating
        games, earn GTM tokens, ascend the leaderboard, and reap rewards in
        GTM tokens.
      </p>
    </header>
    <section className="steps-section">
      <StepCard
        stepNumber="1"
        description="Hold more than 10,000 GTM tokens"
      />
      <StepCard stepNumber="2" description="Play games and have fun" />
      <StepCard
        stepNumber="3"
        description="Every week top 10 of the leaderboard will be rewarded"
      />
    </section>
    </div>

  </>
  )
}

export default InfoPage