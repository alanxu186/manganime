import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../stylesheets/HomePage.css'

function HomePage({manga, setSelectedItem}) {
  console.log(manga)

  const imageTags = manga.map(item => (
    <li key={item.id}>
        <div className='li-container'>
          <div className="li-front">
            <NavLink to="/details" onClick={() => setSelectedItem(item)}>
              <img src={item.attributes.posterImage.small} />
            </NavLink>
          </div>
          <div className="li-back">
            <NavLink to="/details" onClick={() => setSelectedItem(item)}>
              <h3>{item.attributes.canonicalTitle}</h3>
            </NavLink>
          </div>
        </div>
      </li>
  ))

  return (
    <div id="homepage">
      <ul>
        {imageTags}
      </ul>
    </div>
  );
}

export default HomePage;