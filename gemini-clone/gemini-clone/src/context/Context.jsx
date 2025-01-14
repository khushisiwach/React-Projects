import { createContext, useState, useEffect } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompt, setPrevPrompt] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const newChat = () => {
    setLoading(false);
    setShowResult(false);
    setResultData(""); // Reset the result data when starting a new chat
  };

  const onSent = async (prompt) => {
    setResultData(""); 
    setLoading(true);
    setShowResult(true);

    // Add the current prompt to prevPrompt
    setPrevPrompt((prev) => [...prev, input]);

    const response = await run(input);

    let responseArray = response.split("**");
    let newResponse = "";
    responseArray.forEach((part, i) => {
      if (i === 0 || i % 2 !== 1) {
        newResponse += part;
      } else {
        newResponse += `<b>${part}</b>`;
      }
    });

    let formattedResponse = newResponse.split("*").join("</br>");
    setResultData(formattedResponse);

    setLoading(false);
    setInput("");
  };

  useEffect(() => {
    if (recentPrompt) {
      onSent(recentPrompt); 
    }
  }, [recentPrompt]);

  const handleRecentClick = () => {
    if (recentPrompt) {
      setInput(recentPrompt);
    }
  };

  const handleHistoryClick = () => {
    console.log("Previous prompts:", prevPrompt);
  };

  const contextValue = {
    prevPrompt,
    setPrevPrompt,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    newChat,
    handleRecentClick,
    handleHistoryClick,
  };

  return <Context.Provider value={contextValue}>{props.children}</Context.Provider>;
};

export default ContextProvider;
