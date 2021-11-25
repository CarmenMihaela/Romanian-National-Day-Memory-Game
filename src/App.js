import { useState } from "react"
import { shuffle } from 'lodash'
import './style.css'

function App() {
 
  const images = [
    {name: "SARMALE", url: "https://images.megapixl.com/2270/22705217.jpg"}, 
    {name: "COZONAC", url:"https://images.megapixl.com/5248/52480178.jpg"},
    {name: "DRAPEL", url:"https://carmenmihaela.com/images/steagul%20Romaniei.jpg"},
    {name: "HORĂ", url: "https://thumbs.dreamstime.com/z/vama-romania-september-th-kids-wearing-traditional-dancing-round-dance-bucovina-hora-vama-romania-september-th-children-wearing-167762842.jpg"},   
    {name: "IE", url:"https://thumbs.dreamstime.com/z/traditional-romanian-folklore-blouse-called-ie-weared-both-men-women-177203462.jpg"}, 
    {name: "CASTELUL BRAN", url: "https://images.megapixl.com/7185/71858041.jpg"}, 

]

const [cards, setCards] = useState(shuffle([...images, ...images]))
const [clicks, setClicks] = useState(0)
const [activeCards, setActiveCards] = useState([])
const [foundPairs, setFoundPairs] = useState([])
const [won, setWon] = useState(false)

function flipCard(index) {

  //reseting all if game is won
  if (won) {
    setCards(shuffle([...images, ...images]))
    setFoundPairs([])
    setWon(false)
    setClicks(0)
  }
  if (activeCards.length === 0) {
  setActiveCards([index])
  }

  if (activeCards.length === 1) {
    const firstIndex = activeCards[0]
    const secondIndex = index
    if (cards[firstIndex] === cards[secondIndex]) {

      if (foundPairs.length +2 === cards.length) {
        setWon(true)
      }

      setFoundPairs([...foundPairs, firstIndex, secondIndex])
    }
    setActiveCards([...activeCards, index])
    }

  if (activeCards.length === 2) {


    setActiveCards([index])
    }

    setClicks(clicks + 1)

}


return (
<div>
<p> Ziua Națională a României: 1 Decembrie </p>
  <div className="board">
  {cards.map((card, index ) =>  {
    const flippedToFront = (activeCards.indexOf(index) !== -1) || foundPairs.indexOf(index) !== -1
    return (
      <div className={"card-outer " + ( flippedToFront ? 'flipped': '')} key={index} onClick={() => flipCard(index)}>
    <div className="card">
      <div className="front">
        <img src={card.url} alt={card.name} />
        <p>{card.name}</p>
      </div>
      <div className="back"></div>
    </div>
  </div>
    )
  })}
  </div>
  <div className="stats">
  { won ?
    <p>Ai câștigat. Felicitări! </p> : <p>Găsește toate perechile de imagini.</p>
  }
  <span> Click-uri: {clicks}.</span>
  <span> Perechi găsite: {foundPairs.length/2}. </span></div>
  
</div>
)

}

export default App;
