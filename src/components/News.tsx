import React, { useState, useEffect } from "react";

interface NewsProps {
  query: string;
}

const NewsApp: React.FC<NewsProps> = ({query}) => {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedArticle, setSelectedArticle] = useState<number | null>(null);

  // Handler to select an article
  const handleArticleClick = (articleId: number) => {
    setSelectedArticle(articleId);
  };

  const articleToDisplay = articles.find((article) => article.id === selectedArticle);


  const API_KEY = process.env.REACT_APP_NEWS_API_KEY;

  query = query.split(" ").join("%20")

  const URL = `https://newsapi.org/v2/everything?q=%22${query}%22&apiKey=${API_KEY}`;
  console.log('API Key:', API_KEY, "URL", URL);

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
    return <div>
            <p>Loading...</p>
            </div>
    };

  if (error) {
    console.log("error");
    
    return <div>
        <p style={{ color: "red" }}>Error: {error}</p>
      </div>

    };

    console.log(`Working!: ${articles}`);

  return (  

    articleToDisplay ? (  
        <div>
          {(() => {
            console.log("Current Articles:", articles);
            console.log("Selected Article:", articleToDisplay);
            return null; // Return `null` to satisfy React's expectations
          })()}
          <div>
            <h2>{articleToDisplay.title}</h2>
            <p>{articleToDisplay.content}</p>
            <button onClick={() => setSelectedArticle(null)}>Back to articles</button>
          </div>
        </div>

      ) : (
        <div>
          {articles.map((article) => (
            <div key={article.id} style={{
              borderTop: "2px solid white",
              padding: '10px'
            }}>
              <h3
                style={{ cursor: 'pointer', color: 'white' }}
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
