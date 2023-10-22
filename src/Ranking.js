import React from 'react';
import { Link } from 'react-router-dom';
const Ranking = ({ auth, products, topTen }) => {
  return (
    <div>
      <h2>Ranking</h2>
      <ul className='ranking'>
        {topTen.map((rank) =>(
          <li key={rank.id}>
            {rank.rank}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Ranking;
