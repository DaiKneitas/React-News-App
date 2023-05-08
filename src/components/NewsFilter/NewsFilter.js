import React from 'react';
import PropTypes from 'prop-types';

function NewsFilter({ sources, onChange }) {
  return (
    <select onChange={e => onChange(e.target.value)}>
      <option value="">All Sources</option>
      {sources.map(source => (
        <option key={source.id} value={source.id}>
          {source.name}
        </option>
      ))}
    </select>
  );
}

NewsFilter.propTypes = {
  sources: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default NewsFilter;
