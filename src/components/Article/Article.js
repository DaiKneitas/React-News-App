import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function ArticlePreview({ title, description, imageUrl, source, date, url }) {
  return (
    <div className="article-preview">
      <img src={imageUrl} alt={title} />
      <h3>{title}</h3>
      <p>{description}</p>
      <p>Source: {source.name}</p>
      <p>{date}</p>
      <Link to={`/article/${encodeURIComponent(url)}`}>Read more</Link>
    </div>
  );
}

ArticlePreview.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  imageUrl: PropTypes.string.isRequired,
  source: PropTypes.object.isRequired,
  date: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default ArticlePreview;
