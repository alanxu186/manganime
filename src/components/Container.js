import { useEffect } from 'react'
import '../stylesheets/Container.css'
import Pages from './Pages'
import Thumbnail from './Thumbnail'

function Container({manganime, setSelectedItem, reset, setReset}) {
  // const manganime = Array.from(Array(50).keys())
  // console.log(manganime)
  
  const pages = manganime.length % 4 !== 0 ? manganime.slice(4, -(manganime.length % 4)) : manganime.slice(4)

  const pageTags = []

  for (let i = 0; i < pages.length; i += 8) {
    if (i + 8 >= pages.length && Math.ceil(manganime.length / 4) % 2 !== 0) {
      const cur_pages = manganime.slice(i + 4)
      pageTags.push(<Pages key={i} items={cur_pages} zIndex={manganime.length - i} page={(i + 4) / 4 + 2} setSelectedItem={setSelectedItem} reset={reset} setReset={setReset} />)
    } else {
      const cur_pages = pages.slice(i, i + 8)
      pageTags.push(<Pages key={i} items={cur_pages} zIndex={manganime.length - i} page={(i + 4) / 4 + 2} setSelectedItem={setSelectedItem} reset={reset} setReset={setReset} />)
    }
  }

  return (
    <div className='container'>
      <div className="cover">
        <div className="book">
          <div className="book__page book__page--1" >
            <div className="itemsContainer">
              {
                manganime.length === 0 ? 
                <h1>Let us know what you</h1> : 
                manganime.slice(0, 4).map(item => <Thumbnail key={item.id} item={item} setSelectedItem={setSelectedItem} />)
              }
            </div>
            <div className="page__number">1</div>
          </div>

          <div className="book__page book__page--last" onClick={() => setReset(true)}>
            <div className="itemsContainer">
              {
                manganime.length === 0 ? 
                <h1>are searching for...</h1> : (
                  Math.ceil(manganime.length / 4) % 2 !== 0 ?
                  <p>Last Page</p> : 
                  manganime.slice(-(manganime.length % 4)).map(item => <Thumbnail key={item.id} item={item} setSelectedItem={setSelectedItem} />)
                )
              }
            </div>
            <div className="page__number">
              Last Page
              {/* {Math.ceil(manganime.length / 4) % 2 !== 0 ? Math.ceil(manganime.length / 4) + 1 : Math.ceil(manganime.length / 4)} */}
            </div>
          </div>

          {pageTags}
        </div>
      </div>
    </div>
  );
}

export default Container;