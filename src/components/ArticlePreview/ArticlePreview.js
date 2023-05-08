import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import noImagePlaceholder from "../Images/no-image.png";

function ArticlePreview({ article, onClick }) {
  const { title, description, urlToImage, source, publishedAt, url } = article;
  const formattedDate = new Date(publishedAt).toLocaleDateString();

  const handleImageError = (e) => {
    if (e.target.src !== noImagePlaceholder) {
      e.target.src = noImagePlaceholder;
      e.target.alt = "No image available";
    }
  };

  return (
    <div className="article-preview" onClick={onClick}>
      <img
        src={urlToImage || noImagePlaceholder}
        alt={title}
        onError={handleImageError}
      />
      <h3>{title}</h3>
      <p>{description}</p>
      <p>Source: {source.name}</p>
      <p>{formattedDate}</p>
      <Link
        to={{
          pathname: `/article/${encodeURIComponent(url)}`,
          state: { article },
        }}
      >
        Read more
      </Link>
    </div>
  );
}

ArticlePreview.propTypes = {
  article: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    urlToImage: PropTypes.string,
    source: PropTypes.object.isRequired,
    publishedAt: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }),
  onClick: PropTypes.func.isRequired,
};

export default ArticlePreview;
