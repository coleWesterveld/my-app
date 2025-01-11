import React, { useState, useEffect } from "react";

const NewsApp: React.FC = () => {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedArticle, setSelectedArticle] = useState<number | null>(null);

  // Handler to select an article
  const handleArticleClick = (articleId: number) => {
    setSelectedArticle(articleId);
  };

  const articleToDisplay = articles.find((article) => article.id === selectedArticle);


  const API_KEY = "6ebc9ed6b07f46a9a451e80b87f275b8"; // Replace with your actual key
  const URL = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`;

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
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred.");
        }
      } finally {
        setLoading(false);
      }
      

    };

    fetchNews();
  }, []); // Runs once when the component mounts

  if (loading) {
    console.log("Loading");
    return <p>Loading...</p>
    };

  if (error) {
    console.log("error");
    
    return <p style={{ color: "red" }}>Error: {error}</p>

    };

    console.log(`Working!: ${articles}`);

  return (

    articleToDisplay ? (
        <div>
          <h2>{articleToDisplay.title}</h2>
          <p>{articleToDisplay.content}</p>
          <button onClick={() => setSelectedArticle(null)}>Back to articles</button>
        </div>
      ) : (
        <div>
          {articles.map((article) => (
            <div key={article.id}>
              <h3
                style={{ cursor: 'pointer', color: 'blue' }}
                onClick={() => handleArticleClick(article.id)}
              >
                {article.title}
              </h3>
            </div>
          ))}
        </div>
      )
   
  );
};

export default NewsApp;
