import React, { useState, useEffect } from "react";

import GeminiRemarks from "./GeminiRemarks";



interface NewsProps {
  query: string;
  theme: string;
}

const NewsApp: React.FC<NewsProps> = ({ query, theme }) => {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [selectedArticle, setSelectedArticle] = useState<any | null>(null);
  const [fullArticleContent, setFullArticleContent] = useState<string | null>(null); // For full article content

  const handleArticleClick = (articleId: number) => {
    setSelectedArticle(articleId);
  };

  const handleBackToArticles = () => {
    setSelectedArticle(null);
    setFullArticleContent(null); // Reset full content when going back
  };

  const API_KEY = process.env.REACT_APP_NEWS_API_KEY;
  const URL = `https://newsapi.org/v2/everything?q=${query}&apiKey=${API_KEY}`;

  // Fetch articles from NewsAPI
  useEffect(() => {
    const fetchNews = async () => {
      console.log("Fetching news...");
      try {
        const response = await fetch(URL);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Fetched data:", data);
        setArticles(data.articles);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [query,URL]); // Runs once when the component mounts

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div style={{ color: "red" }}>Error: {error}</div>;
  }

  return selectedArticle ? (
    <div
  style={{
    display: "flex", // Use flexbox for layout
    alignItems: "flex-start", // Align items to the top
    gap: "20px", // Space between content and image
  }}
>
  {/* Left Section: Text Content */}
  <div style={{ flex: 1 }}> {/* Occupy remaining space */}
    <h2 style={{ color: theme === "dark" ? "#fff" : "#000" }}>
      {selectedArticle.title}
    </h2>
    <p style={{ color: theme === "dark" ? "#ddd" : "#333", marginBottom: "10px" }}>
      {fullArticleContent}
    </p>
    <p style={{ color: theme === "dark" ? "#aaa" : "#555", fontStyle: "italic" }}>
      Source: {selectedArticle.source?.name || "Unknown"}
    </p>
    
    <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center", // Align items vertically if needed
    marginTop: "20px", // Optional spacing around the container
  }}
>
  <a
    href={selectedArticle.url}
    target="_blank"
    rel="noopener noreferrer"
    style={{
      color: theme === "dark" ? "#4CAF50" : "#007BFF",
      textDecoration: "none",
      fontWeight: "bold",
    }}
  >
    Read The Full Article Here
  </a>

  <button
    onClick={handleBackToArticles}
    style={{
      backgroundColor: theme === "dark" ? "#444" : "#eee",
      color: theme === "dark" ? "#fff" : "#000",
      border: "none",
      padding: "10px 15px",
      cursor: "pointer",
    }}
  >
    Back to articles
  </button>
</div>

    <GeminiRemarks
      prompt={`
          The following article by ${selectedArticle.source?.name || "Unknown"} is called ${selectedArticle.title} and is from ${selectedArticle.url},
          can you read the article and give a detailed bias report on the article, fact check it (point out some facts claimed in the article and mention if they are true or false, and how so), and also give some background on the source please? Thanks!
        `}
        theme={theme}
    />
  </div>

  {/* Right Section: Image */}
  {selectedArticle.urlToImage && (
    <div style={{ flexShrink: 0 }}> {/* Prevent image from shrinking */}
      <img
        src={selectedArticle.urlToImage}
        alt={selectedArticle.title}
        style={{
          width: "300px", // Fixed width for the image
          maxHeight: "200px", // Limit the height
          objectFit: "cover", // Maintain aspect ratio
          borderRadius: "5px", // Rounded corners
        }}
      />
    </div>
  )}
</div>

  ) : (
    <div>
      {articles.map((article, index) => (
        <div
        key={index}
        style={{
          display: "flex", // Flexbox for horizontal layout
          justifyContent: "space-between", // Space between title and source
          alignItems: "center", // Vertically align items
          borderTop: theme === "dark" ? "2px solid #666" : "2px solid #ccc",
          padding: "10px",
          backgroundColor: theme === "dark" ? "#222" : "#f9f9f9",
        }}
      >
        <h3
          style={{
            cursor: "pointer",
            color: theme === "dark" ? "#fff" : "#000",
            flex: 1, // Take up available space
          }}
          onClick={() => handleArticleClick(article)}
        >
          {article.title}
        </h3>
        <p
          style={{
            color: theme === "dark" ? "#aaa" : "#555",
            fontSize: "0.9em",
            marginLeft: "20px",
          }}
        >
          {article.source?.name || "Unknown Source"}
        </p>
      </div>
      ))}
    </div>
  );
};

export default NewsApp;

