import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { GridLoader } from 'react-spinners'
import Markdown from 'marked-react';


interface GeminiRemarksProps {
    prompt: string;
  }

function GeminiRemarks({ prompt } : GeminiRemarksProps) {
  const [inputValue, setInputValue] = useState(prompt);
  const [promptResponses, setpromptResponses] = useState<string[]>([]);


  const [loading, setLoading] = useState(false);
  
  const genAI = new GoogleGenerativeAI(
    `${process.env.REACT_APP_GEMINI}`
// add your api key here
  );
  const handleInputChange = (e : React.ChangeEvent<any>) => {
    setInputValue(e.target.value);
  };
  const getResponseForGivenPrompt = async () => {
    try {
      setLoading(true)
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(inputValue);
      setInputValue('hello world')
      const response = result.response;
      const text = response.text();
      console.log(text)
      setpromptResponses([...promptResponses,text]);
  
      setLoading(false)
    }
    catch (error) {
      console.log(error)
      console.log("Something Went Wrong");
      setLoading(false)
    }
  }
    ;

  return (
    <div className="container">
    <div className="row">
      <div className="col-auto">
        <button onClick={getResponseForGivenPrompt} className="btn btn-primary"> Summary And Analysis</button>
      </div>
    </div>
    {loading ? (
      <div className="text-center mt-3">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
          <GridLoader />
        </div>
      </div>
    ) : (
      
        <div>

          <Markdown>{promptResponses[promptResponses.length - 1]}</Markdown>
        
        </div>
      
    )}
  </div>
  
  );

}
export default GeminiRemarks;