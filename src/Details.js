import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './Details.css';

const Details = ({ match }) => {
  const [recipe, setRecipe] = useState([]);
  let id = match.params.id;
  console.log(match.params.id);
    useEffect(() => {
        fetchRecipe();
        //console.log("match = " + match.params.id)
        //console.log("match path= " + match.path)
}, [])

    const fetchRecipe = async () => {
        const oneRecipe = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        const data = await oneRecipe.json();
        console.log("one" + data.meals[0].idMeal);
      setRecipe(data.meals);
      console.log("Here 2" + data.meals);
    }

  var ingredients = [];
    function createIngredients(meal) {
    // Get all ingredients from the object. Up to 20
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
        ingredients.push(
            `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
        );
        } else {
        // Stop if there are no more ingredients
        break;
        }
    }
    //console.log("dfhuj" +ingredients)
    }
  
  return (
    <div>
      {recipe.map(rec => (
        <div className="details-page">
          <h1 className="recipe-name">Recipe: {rec.strMeal} </h1>
          <img src={rec.strMealThumb} alt="Meal image" width="600px" height="500px" />

        {createIngredients(rec)}
      {console.log("Ingredients " + ingredients)}
          <div className="ingredients">
            <h3>Ingredients:</h3>
            {ingredients.map(ingr => (
              <ul>
                <li>{ingr}</li>
              </ul>
            ))}
          </div>

          <h3>Instructions:</h3>
          <div className="instructions">
             <p>{rec.strInstructions} </p>
         </div>
      </div>
      ))}
      
        
      </div>
      
    )
}

export default Details;
