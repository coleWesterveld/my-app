import React, { useState, useEffect } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { GridLoader } from 'react-spinners';
import './GeminiRemarks.css';
import Markdown from 'marked-react';

interface GeminiRemarksProps {
  prompt: string;
  theme: string;
}

interface FactCheck {
  claim: string;
  isTrue: boolean;
  explanation: string;
}

interface ArticleAnalysis {
  sourceBackground: string;
  biasReport: string;
  factCheck: FactCheck[];
}

function GeminiRemarks({ prompt, theme }: GeminiRemarksProps) {
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<ArticleAnalysis | null>(null);

  const genAI = new GoogleGenerativeAI(`${process.env.REACT_APP_GEMINI}`);

  const getResponseForGivenPrompt = async () => {
    try {
      setLoading(true);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      const structuredPrompt = `Analyze the following article and return a JSON response in this exact format, ensuring valid JSON with no control characters:
      {
        "sourceBackground": "Write background about the source here",
        "biasReport": "Write bias analysis here",
        "factCheck": [
          {
            "claim": "Write claim here",
            "isTrue": true,
            "explanation": "Write explanation here"
          }
        ]
      }

      Article info: ${prompt}`;

      const result = await model.generateContent(structuredPrompt);
      const response = result.response;
      const text = await response.text();
      const sanitizedText = text.replace(/```(?:json|JSON)?\n?([\s\S]*?)\n?```/g, '$1').trim();

      console.log('Sanitized Text:', sanitizedText); // Debug log

      try {
        const analysisData = JSON.parse(sanitizedText) as ArticleAnalysis;
        console.log('Parsed Analysis Data:', analysisData); // Debug log
        setAnalysis(analysisData);
      } catch (parseError) {
        console.error('JSON Parse Error:', parseError);
        console.log('Raw text:', sanitizedText);
        throw new Error('Failed to parse API response');
      }
    } catch (error) {
      console.error(error);
      setAnalysis(null);
    } finally {
      setLoading(false);
    }
  };

  // Automatically call API on component mount
  useEffect(() => {
    getResponseForGivenPrompt();
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  return (
    <div className={`container ${theme}`}>
      {loading && (
        <div className="text-center mt-3">
          <GridLoader />
        </div>
      )}

      {analysis && (
        <div className="analysis-grid">
          <div className="analysis-box source-box">
            <h3>Source Background</h3>
            <p><Markdown>{analysis.sourceBackground}</Markdown></p>
          </div>

          <div className="analysis-box bias-box">
            <h3>Bias Analysis</h3>
            <p><Markdown>{analysis.biasReport}</Markdown></p>
          </div>

          <div className="analysis-box fact-check-box">
            <h3>Fact Check</h3>

            {analysis.factCheck.map((fact: FactCheck, index: number) => (
              <div key={index} className="fact-item">
                <h4>Claim: {fact.claim}</h4>
                <p className={`verdict ${fact.isTrue ? 'true' : 'false'}`}>
                  {fact.isTrue ? '✓ True' : '✗ False'}
                </p>
                <p>{fact.explanation}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default GeminiRemarks;
