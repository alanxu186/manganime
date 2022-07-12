import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../stylesheets/TopAnime.css'

function TopAnime({ anime, setSelectedItem }) {
  console.log(anime);

  const [active, setActive] = useState('')

  const animeImages = anime.map((item) => (
    <li key={item.id}>
      <div className='anime-container'>
        <div>
          <NavLink to="/details" onClick={() => setSelectedItem(item)}>
            <img src={item.attributes.posterImage.small} alt={item.attributes.canonicalTitle}></img>
          </NavLink>
        </div>
        <div className='anime-title'>
          <NavLink to="/details" onClick={() => setSelectedItem(item)}>
            {item.attributes.canonicalTitle}
          </NavLink>
        </div>
      </div>
    </li>
  ))

  return (
    <div id="top-anime">
      <h1>50 Most Popular Anime</h1>
      {/* <div className='split-container'>
        <div className='left-panel'>
          <h1>First anime</h1>
        </div>
        <div className='right-panel'>
          <h1>Second anime</h1>
        </div>
      </div> */}
      <ul>
        {animeImages}
      </ul>
    </div>
  );
}

export default TopAnime;