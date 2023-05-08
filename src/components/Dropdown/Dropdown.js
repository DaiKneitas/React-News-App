import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Dropdown.css';

const Dropdown = ({ sources, onSelect }) => {
  const [selectedSource, setSelectedSource] = useState('');

  useEffect(() => {
    if (sources.length > 0) {
      setSelectedSource(sources[0].id);
      onSelect(sources[0].id);
    }
  }, [sources, onSelect]);

  const handleChange = e => {
    const selected = e.target.value;
    setSelectedSource(selected);
    onSelect(selected);
  };

  return (
    <select
      className="source-dropdown"
      value={selectedSource}
      onChange={handleChange}
    >
      {sources.map(source => (
        <option key={source.id} value={source.id}>
          {source.name}
        </option>
      ))}
    </select>
  );
};

Dropdown.propTypes = {
  sources: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default Dropdown;
