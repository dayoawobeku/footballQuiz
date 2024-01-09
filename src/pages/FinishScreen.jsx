import { Link, useNavigate } from "react-router-dom";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
// import './custom.css'
import "react-circular-progressbar/dist/styles.css";

import { css, styled } from "styled-components";
import { useQuestions } from "../contexts/DataProvider";
import { HiHome } from "react-icons/hi2";
import { useEffect } from "react";
// import { initParticlesEngine } from "@tsparticles/react";
import JSConfetti from "js-confetti";

const Content = styled.div`
  display: flex;
  flex-direction: column;

  gap: 20px;
  align-items: center;
  border-radius: 10px;
  opacity: 0.8;
  padding-block: 70px;
`;

const variation = {
  home: css`
    background-color: #555454;
    width: 40px;
  `,
  away: css`
    background-color: green;
  `,
};

const FinalWrapper = styled.div`
  background-image: url("./images/final-bg.webp");
  background-color: lightgreen;
  position: relative;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  height: 100dvh;
  place-items: center;

  &::before {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background: rgb(144, 238, 144, 0.6);
  }
`;

const Button = styled(Link)`
  ${(prop) =>
    prop["data-variation"] === "home" ? variation.home : variation.away}
  margin-right: 10px;
  padding-inline: 8px;
  padding-block: 8px;
  font-family: "Permanent Marker", cursive;
  border-radius: 8px;
  display: grid;
  place-items: center;
  text-decoration: none;
  color: white;
  border: none;
`;

//when a player scores all questions in the quiz(100%) there should be thid rain
//of ribbons as that which shows up on the birthday of a twitter user when they visit
//their profile page

//start of the particlejs

//end of the particlejs

function FinishScreen() {
  const {
    totalPoints,
    maxPossiblePoint,
    isQuestionsOpen,
    leagueType,
    dispatch,
  } = useQuestions();

  const navigate = useNavigate();

  const path = leagueType
    .split(" ")
    .join("")
    .replace(/[A-Z]/, (match) => `/${match.toLowerCase()}`);

  useEffect(() => {
    console.log(isQuestionsOpen);
  }, [isQuestionsOpen]);

  function handleFinish() {
    dispatch({ type: "finish" });
    navigate("/premierLeague");
  }

  const percentage =
    totalPoints === 0 || maxPossiblePoint === 0
      ? 0
      : Math.round((totalPoints / maxPossiblePoint) * 100);

  useEffect(() => {
    const confetti = new JSConfetti();

    if (percentage >= 90) {
      confetti.addConfetti({
        confettiColors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
      });
    }
  }, [percentage]);

  //particles

  // useEffect(() => {
  //   initParticlesEngine(async (engine) => {
  //     // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
  //     // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
  //     // starting from v2 you can add only the features you need reducing the bundle size
  //     //await loadAll(engine);
  //     //await loadFull(engine);
  //     await loadSlim(engine);
  //     //await loadBasic(engine);
  //   }).then(() => {
  //     setInit(true);
  //   });
  // }, []);

  // const particlesLoaded = (container) => {
  //   console.log(container);
  // };

  // const options = useMemo(
  //   () => ({
  //     background: {
  //       color: {
  //         value: "#0d47a1",
  //       },
  //     },
  //     fpsLimit: 120,
  //     interactivity: {
  //       events: {
  //         onClick: {
  //           enable: true,
  //           mode: "push",
  //         },
  //         onHover: {
  //           enable: true,
  //           mode: "repulse",
  //         },
  //       },
  //       modes: {
  //         push: {
  //           quantity: 4,
  //         },
  //         repulse: {
  //           distance: 200,
  //           duration: 0.4,
  //         },
  //       },
  //     },
  //     particles: {
  //       color: {
  //         value: "#ffffff",
  //       },
  //       links: {
  //         color: "#ffffff",
  //         distance: 150,
  //         enable: true,
  //         opacity: 0.5,
  //         width: 1,
  //       },
  //       move: {
  //         direction: "none",
  //         enable: true,
  //         outModes: {
  //           default: "bounce",
  //         },
  //         random: false,
  //         speed: 6,
  //         straight: false,
  //       },
  //       number: {
  //         density: {
  //           enable: true,
  //         },
  //         value: 80,
  //       },
  //       opacity: {
  //         value: 0.5,
  //       },
  //       shape: {
  //         type: "circle",
  //       },
  //       size: {
  //         value: { min: 1, max: 5 },
  //       },
  //     },
  //     detectRetina: true,
  //   }),
  //   [],
  // );

  return (
    <FinalWrapper>
      {/* <Final> */}
      <Content>
        <div style={{ width: 150, height: 150 }}>
          <CircularProgressbar
            value={percentage}
            text={`${percentage}%`}
            styles={buildStyles({
              pathTransitionDuration: 8.8,
              pathColor: "green",
              textColor: "green",
            })}
          />
        </div>
        <div>
          Total Score : {totalPoints} of {maxPossiblePoint}
        </div>
        {percentage > 0 && percentage < 50 && <div>Poor</div>}
        {percentage > 50 && percentage < 80 && <div>Good 👌 </div>}
        {percentage > 80 && <div>Excellent ✌️</div>}
        <div style={{ display: "flex" }}>
          <Button data-variation="home" onClick={handleFinish} to="/">
            <HiHome style={{ color: "white", fontSize: "20px" }} />
          </Button>
          <Button to={path} onClick={handleFinish} data-variation="away">
            PLAY AGAIN
          </Button>
        </div>
      </Content>
      {/* </Final> */}
    </FinalWrapper>
  );
}

export default FinishScreen;
