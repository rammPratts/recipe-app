import uuidv4 from "uuidv4"
import {Recipe, getSavedRecipes} from "./recipe"

const newRecipeButton = document.querySelector("#new-recipe")

newRecipeButton.addEventListener("click", (e) => {

    const id = uuidv4() 
    const recipes = getSavedRecipes()
    const recipe = new Recipe(id)
    recipes.push(recipe)
    localStorage.setItem("recipes", JSON.stringify(recipes))
    location.assign(`/add-recipe.html#${id}`)
})