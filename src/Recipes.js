import React from 'react';
import './Recipes.css';
import { Link } from 'react-router-dom';

const Recipes = ({ recipe, title, category, instructions, image }) => {
    //createIngredients(recipe)

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
            <div className="recipe">
                <div className="recipe-image">
                    <img src={image} alt=""/>
                </div>
                <div className="details">
                    <h1 className="title-recipe">{title}  </h1>
                    <p>Category: {category}</p>
                    <button className="view-recipe">
                        <Link to={`/react-recipe-app/details/${recipe.idMeal}`} className="view-recipe-btn" >View Recipe</Link>
                        {/**<Link to={`/recipe/${recipe.idMeal`} >View Recipe</Link> */}
                    </button>
                    {/** <p>{instructions} </p> */}
                    {createIngredients(recipe)}
                    {/**<div>Ingredients : {ingredients.map(ingr => (
                        <ul>
                            <li>{ingr}</li>
                        </ul>
                ))} </div> */}
                </div>
            </div>
     </div>
    );
}

export default Recipes;