import React, {useState, useEffect} from "react";
import style from './App.css';

function App() {
  const app_id="a83deedc";
  const app_key="x";
  
  const [dishes, setDishes] = useState([]);
  const [search, setSearch] = useState(['']);
  //const api = `https://api.edamam.com/api/food-database/v2/parser?app_id=${app_id}&app_key=${app_key}&ingr=${query}&nutrition-type=logging`
  const [query, setQuery] = useState(['banana']);
  const [newItem, setNewItem] = useState([]);
  const [cart, setCart] = useState([]);


  useEffect(()=>{
    getDishes();
  }, [query]);
  
  const getDishes = async () => {
    const response = await fetch(`https://api.edamam.com/api/food-database/v2/parser?app_id=${app_id}&app_key=${app_key}&ingr=${query}&nutrition-type=logging`);
    const data = await response.json();
    setDishes(data.hints);
  
  };

  const updateSearch = e =>{
    setSearch(e.target.value);
    };
    
  const getSearch = e =>{
  e.preventDefault();
  setQuery(search);
    };

  const Meal = ({foodId, title, calories, addItem}) => {
    const [total, setTotal]= useState(0);

    function addItem() {

      const item = {
        id: Math.floor(Math.random() * 1000),
        text: `${title}`,
        calories: parseInt(`${calories.toFixed(0)}`),
      };
    
     setTotal(total + `${calories}`);
     console.log(total);

      setCart((cart) => [...cart, item]);
      //setNewItem("")
    
      //setNewItem("B");
      console.log(item);
      //console.log(newItem);
      ;
    };
      return (
        <div key={foodId}> 
          <article className="single-dish" > 
          <h4 >{title}</h4>
          
          <p>Calories: {calories.toFixed(0)} 
          
          <button onClick={addItem} className="onAdd" >Add Calories</button></p>  
          </article>
         
        <div > 
        </div>
      
      </div>
    );
  }; 
  
  const Basket = ({cart}) => {
    return (
      <article>
        <h2>Calories Consumed</h2>
        
        {cart.map((item) => (
          <div className="cart_box" key={item.id}>
            {item.text} {item.calories}
            </div>
  
          
        ))}

    <div className="findTotal"> 
    <strong>Total: {cart.reduce((total, item) => {
      return total + (item.calories || 0 )
    }, 0)} </strong>
      </div>
  
      </article>
    );
  };

  
  return (
    <div className="App" >
      <h1 className="header" >CCount</h1>
      <form onSubmit={getSearch} className="form"> 
      <input 
      className="input"
      type="text"
      placeholder="What did you eat today?"
      value={search} 
      onChange={updateSearch}
      />
      <button type="submit" className="searchButton">Search</button>
      </form>

<div className="container">     
<div className="block col-2"> 
<h2>Items found...</h2>    
{dishes.map(dish=>(
  <Meal
  
  foodId={dish.food.foodId}
  title={dish.food.label}
  calories={dish.food.nutrients.ENERC_KCAL}
  image={dish.food.image}
  //addItem={addItem}
  />
))}

    
</div>
<div className="block col-1">
 {/*  */} 
 <Basket 
 dishes={dishes}
  cart={cart} 
  setCart={setCart}
  
   />
  

</div></div>



    
    </div>
  );
}

export default App;
