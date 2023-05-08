import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchArticlesStart,
  fetchArticlesSuccess,
  fetchArticlesError,
} from "../../store/articlesSlice";
import {
  fetchSourcesStart,
  fetchSourcesSuccess,
  fetchSourcesError,
} from "../../store/sourcesSlice";
import axios from "axios";
import ArticlePreview from "../../components/ArticlePreview/ArticlePreview";
import Spinner from "../../components/Spinner/Spinner";
import NewsFilter from "../../components/NewsFilter/NewsFilter";
import SearchBar from "../../components/SearchBar/SearchBar";

function HomePage() {
  const dispatch = useDispatch();
  const articles = useSelector((state) => state.articles.articles);
  const sources = useSelector((state) => state.sources.sources);
  const loading = useSelector((state) => state.articles.loading);
  const sourcesLoading = useSelector((state) => state.sources.loading);

  const [sourceFilter, setSourceFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchSources = async () => {
      dispatch(fetchSourcesStart());
      try {
        const response = await axios.get(
          `https://newsapi.org/v2/sources?apiKey=2780f76f42264538831da89197cc9cae`
        );
        dispatch(fetchSourcesSuccess(response.data.sources));
      } catch (error) {
        dispatch(fetchSourcesError(error.message));
      }
    };

    fetchSources();
  }, [dispatch]);

  useEffect(() => {
    const fetchArticles = async () => {
      dispatch(fetchArticlesStart());
      try {
        const response = await axios.get(
          `https://newsapi.org/v2/top-headlines?${
            sourceFilter ? `sources=${sourceFilter}&` : "country=us&"
          }q=${searchQuery}&pageSize=20&apiKey=2780f76f42264538831da89197cc9cae`
        );
        dispatch(fetchArticlesSuccess(response.data.articles));
      } catch (error) {
        dispatch(fetchArticlesError(error.message));
      }
    };

    fetchArticles();
  }, [dispatch, sourceFilter, searchQuery]);

  const handleFilterChange = (source) => {
    setSourceFilter(source);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleArticleClick = (article) => {
    navigate(`/article/${encodeURIComponent(article.url)}`, {
      state: { article },
    });
  };

  return (
    <div className="home-page">
      <NewsFilter sources={sources} onChange={handleFilterChange} />
      <SearchBar onSearch={handleSearch} />
      {loading || sourcesLoading ? (
        <Spinner />
      ) : (
        <div className="articles">
          {articles.map((article) => (
            <ArticlePreview
              key={article.url}
              article={article}
              onClick={() => handleArticleClick(article)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default HomePage;
