import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../../components/Spinner/Spinner";

function ArticlePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const articleFromState = location.state?.article;
  const [article, setArticle] = useState(articleFromState);
  const articleUrl = encodeURIComponent(
    location.pathname.split("/article/")[1]
  );

  useEffect(() => {
    if (!articleFromState) {
      const fetchArticle = async () => {
        try {
          const response = await axios.get(
            `https://newsapi.org/v2/everything?q=url:${articleUrl}&apiKey=2780f76f42264538831da89197cc9cae`
          );
          setArticle(response.data.articles[0]);
        } catch (error) {
          console.error("Error fetching article data:", error);
        }
      };

      fetchArticle();
    }
  }, [articleFromState, articleUrl]);

  const returnToHomepage = () => {
    navigate("/");
  };

  if (!article) {
    return <Spinner />;
  }

  const formattedDate = new Date(article.publishedAt).toLocaleDateString();

  return (
    <div className="article-page">
      <button onClick={returnToHomepage} className="return-homepage">
        Return to Homepage
      </button>
      <div className="article-header">
        <img
          src={article.urlToImage}
          alt={article.title}
          className="article-image"
        />
        <div className="article-details">
          <h1>{article.title}</h1>
          <p>Source: {article.source.name}</p>
          <p>{formattedDate}</p>
          <a href={article.url} target="_blank" rel="noopener noreferrer">
            Read on {article.source.name}
          </a>
        </div>
      </div>
      <div className="article-content">
        <p>{article.description}</p>
      </div>
    </div>
  );
}

export default ArticlePage;
