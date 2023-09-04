
import "./Item.scss";
import { WifiHigh, PawPrint, Television, CookingPot, Car, Bathtub, Wind } from 'phosphor-react'


export function Item({ dragOverlay, name }) {

  const style = {
    cursor: dragOverlay ? "grabbing" : "grab",
  };

  return (
    <>
      {name=='Wi-fi'  &&  <div style={style} className="item"><WifiHigh size={20} color="#383b58" /> - {name}</div>}
      {name=='Piscina'  &&  <div style={style} className="item"><p className='poolIcon'></p> - {name}</div>}
      {name=='Pets'  &&  <div style={style} className="item"><PawPrint size={20} color="#383b58" /> - {name}</div>}
      {name=='TV'  &&  <div style={style} className="item"><Television size={20} color="#383b58" /> - {name}</div>}
      {name=='Cozinha'  &&  <div style={style} className="item"><CookingPot size={20} color="#383b58" /> - {name}</div>}
      {name=='Estacionamento'  &&  <div style={style} className="item"><Car size={20} color="#383b58" /> - {name}</div>}
      {name=='Jacuzzi'  &&  <div style={style} className="item"><Bathtub size={20} color="#383b58" /> - {name}</div>}
      {name=='Ar-condicionado'  &&  <div style={style} className="item"><Wind size={20} color="#383b58" /> - {name}</div>}    
    </>
  );
};

