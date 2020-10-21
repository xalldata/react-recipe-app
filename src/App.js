import React, { useEffect, useState } from 'react';
import './App.css';
import Recipes from './Recipes';
import Details from './Details';

import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

function App() {

  
  const [recipes, setRecipes] = useState([]);
  
  const [query, setQuery] = useState('');
  const [search, setSearch] = useState(query);

  useEffect(() => {
    getRecipes();
    console.log("Effect");
  }, [query])

  const getRecipes = async () => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const data = await response.json();
    console.log(data.meals);
    setRecipes(data.meals);
  }

  const handleChange = e => {
    setSearch(e.target.value);
    //console.log("handle Change")
  }

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
  }

  return (
    <Router>
      
      <div className="App">
         <div className="hero">
          <div className="hero-content">
            <div className="title">
              <h1>Look for a recipe</h1>
              </div>
            <form className="search-form"  > {/**onSubmit={getSearch} */}
              <input
                className="search-bar"
                type="text"
                value={search}
                onChange={handleChange}
              />
              <button className="search-button" type="submit" onClick={getSearch} >
                <Link to={'/'} className="btn" >Search</Link>
              </button>
            </form>
          </div>
        </div>
        <div className="recipes">
          
      {recipes ? recipes.map(recipe => (  
        <Route
          path='/' exact
          render={(props) => (
            <Recipes {...props} key={recipe.idMeal}
          recipe = {recipe}
          title={recipe.strMeal}
          category={recipe.strCategory}
          instructions={recipe.strInstructions}
          image={recipe.strMealThumb} />
          )}
            />
          )) : <h1>Sorry, there's no recipe with under that name</h1>}
        </div>
          <Route path='/details/:id' component={Details} />             
    </div>
    </Router>
  );
}

export default App;
