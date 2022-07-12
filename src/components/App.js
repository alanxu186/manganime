import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import '../stylesheets/App.css';
import Intro from './Intro';
import Header from './Header';
import HomePage from './HomePage';
import SearchPage from './SearchPage';
import MenuBar from './MenuBar';
import Details from './Details';
import TopAnime from './TopAnime';
import FavoritedPage from './FavoritedPage';

function App() {
  const [manganime, setManganime] = useState([])
  const [searchType, setSearchType] = useState("manga")
  const [selectedItem, setSelectedItem] = useState({
    attributes: {
      conoicalTitle: "",
      posterImage: {
        large: ""
      }
    }
  })
  const [manga, setManga] = useState([])
  const [anime, setAnime] = useState([])
  const [users, setUsers] = useState([])
  const [currentUser, setCurrentUser] = useState({})
  const [firstStart, setfirstStart] = useState("")
  const navigate = useNavigate()

  const usersList = {}
  if (users.length > 0) {
    users.forEach(user => {
      usersList[user.username] = user.password
    })
  }

  const favoritedList = new Set()
  if (currentUser.favorited) {
    currentUser.favorited.forEach(item => favoritedList.add(item.id))
  }

  // console.log("mange", manga)
  // console.log("anime", anime)
  // console.log(usersList)

  useEffect(() => {
    fetch(`http://localhost:3000/manga`)
    .then(res => res.json())
    .then(setManga)

    fetch(`http://localhost:3000/anime`)
    .then(res => res.json())
    .then(setAnime)

    navigate("/")
    setfirstStart(true)
  }, [])
  
  useEffect(() => {
    fetch(`http://localhost:3000/users`)
    .then(res => res.json())
    .then(setUsers)
  }, [currentUser])
  
  function searchManganime(search) {
    const modifiedQuery = search.toLowerCase().split(" ").join("%20")
    console.log(modifiedQuery)
    fetch(`https://kitsu.io/api/edge/${searchType}?filter[text]=${modifiedQuery}&page[limit]=20&page[offset]=0`, {
      method: "GET",
      headers: {
        "Accept": "application/vnd.api+json",
        "Content-Type": "application/vnd.api+json"
      }
    })
    .then(res => res.json())
    .then(data => setManganime(data.data))
  }

  if (manga.length === 0 || anime.length === 0) {
    return (<p>Loading</p>)
  }

  return (
    <div className="App">
        {firstStart ? <Intro manga={manga} anime={anime} firstStart={firstStart} setfirstStart={setfirstStart} /> : null}
        <Header users={users} usersList={usersList} currentUser={currentUser} setCurrentUser={setCurrentUser} />
        <MenuBar />
        <Routes>
          <Route path="/" element={<HomePage manga={manga} setSelectedItem={setSelectedItem} />} />
          <Route path="/search" element={<SearchPage manganime={manganime} setSelectedItem={setSelectedItem} searchManganime={searchManganime} searchType={searchType} setSearchType={setSearchType} />} />
          <Route path="/details" element={<Details selectedItem={selectedItem} currentUser={currentUser} setCurrentUser={setCurrentUser} favoritedList={favoritedList} />} />
          <Route path="/topanime" element={<TopAnime anime={anime} setSelectedItem={setSelectedItem}/>} />
          <Route path="/favorited" element ={<FavoritedPage anime={anime} manga={manga} setSelectedItem={setSelectedItem} currentUser={currentUser}/>}/>
        </Routes>
    </div>
  );
}

export default App;
