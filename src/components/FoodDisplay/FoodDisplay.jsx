import React, { useContext } from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../context/StoreContext'
import FoodItem from '../FoodItem/FoodItem'

const FoodDisplay = ({category}) => {
  
    const {food_list} = useContext(StoreContext)
  
  
    return (
    <div className='food-display' id='food-display'>
    <h2>Os Mais Pedidos</h2>
    <div className="food-display-list">
    {food_list.map((item, index)=>{
        console.log('Categoria selecionada:', category);
        console.log('Categoria do item:', item.category);        
        if (category==="All" || category === item.category) {
            return (<FoodItem
            key={index}
            id={item._id}
            name={item.name}
            price={item.price}
            description={item.description}
            image={item.image}
            />
        );
        }
        return null;
    })}
    </div>
    </div>
  )
}

export default FoodDisplay