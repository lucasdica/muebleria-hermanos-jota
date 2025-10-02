import { useState } from 'react';
import styles from './Buscador.module.css';
import { FaSearch } from 'react-icons/fa';

function Buscador({ filtrarProductos }) {
  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearchClick = () => {
    filtrarProductos(query);
  };

  return (
    <div className={styles.buscador}>
        <FaSearch
            className={styles.search}
            onClick={handleSearchClick}
        />
        <input
            type="text"
            size="40"
            name="query"
            id="query"
            value={query}
            onChange={handleInputChange}
        />
    </div>
  );
}

export default Buscador;
