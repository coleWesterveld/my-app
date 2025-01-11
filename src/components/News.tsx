import React, { useState, useEffect } from "react";

const NewsApp: React.FC = () => {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <div>
      <h2>Top Headlines</h2>
      <ul>
        {articles.map((article, index) => (
          <li key={index} style={{ marginBottom: "20px" }}>
            <h3>{article.title}</h3>
            <p>{article.description}</p>
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "blue" }}
            >
              Read more
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewsApp;
