import { createContext, useContext, useEffect, useReducer } from "react";
// import { useQuery } from "react-query";

const DataContext = createContext();

const initialState = {
  questions: [],
  tracker: 0,
  isQuestionsOpen: true,
  totalPoints: 0,
  leagueType: "",
  answer: null,
  maxQxts: 1,
  maxPossiblePoint: 0,
};

// const BASE_URL = '';
//implementing

function reducer(state, action) {
  switch (action.type) {
    case "loadData":
      return {
        ...state,
        questions: action.payload,
        isQuestionsOpen: true,
      };
    case "increment":
      return {
        ...state,
        tracker: state.tracker + 1,
        //come back
        answer: null,
      };
    case "decrement":
      return {
        ...state,
        tracker: state.tracker - 1,
      };
    case "finish":
      return {
        ...state,
        tracker: 0,
        isQuestionsOpen: true,
        maxQxts: 1,
        answer: null,
        totalPoints: 0,
        maxPossiblePoint: 0,
      };
    case "startQuiz":
      return {
        ...state,
        isQuestionsOpen: false,
        leagueType: action.payload[0],
        maxQxts: action.payload[1],
        maxPossiblePoint: action.payload[2],
      };
    case "checkAnswer":
      return {
        ...state,
        answer: action.payload.at(0),
        totalPoints: action.payload.at(1),
      };
    default:
      return new Error("Action Type not Found");
  }
}

//eslint-disable-next-line
function DataProvider({ children }) {
  useEffect(function () {
    fetch("http://localhost:3001/quiz")
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: "loadData", payload: data });
        console.log(data);
      });
  }, []);

  const [
    {
      questions,
      isQuestionsOpen,
      leagueType,
      totalPoints,
      tracker,
      answer,
      maxQxts,
      maxPossiblePoint,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  return (
    <DataContext.Provider
      value={{
        questions,
        maxQxts,
        leagueType,
        tracker,
        isQuestionsOpen,
        answer,
        totalPoints,
        maxPossiblePoint,
        dispatch,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

function useQuestions() {
  const context = useContext(DataContext);

  if (context === undefined) {
    throw new Error("useQuestions must be used within a DataProvider");
  }
  return context;
}

//eslint-disable-next-line
export { DataProvider, useQuestions };
