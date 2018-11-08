// import { getRecipeIndex, getSavedRecipes } from "./recipe-functions"

const getSavedRecipes = () => {
    const recipesJSON = localStorage.getItem('recipes')

    try {
        return recipesJSON ? JSON.parse(recipesJSON) : []
    } catch (e) {
        return []
    }
}

const getRecipeIndex = (recipeId) => {
    return recipes.findIndex((element) => {
        return element.id === recipeId
    })

}


const recipes = getSavedRecipes()
const recipeId = location.hash.substring(1)
const recipeIndex = getRecipeIndex(recipeId)
const recipe = recipes[recipeIndex]
const ingridients = recipe.ingridients

const recipeNameElement = document.querySelector("#recipe-name")
const recipeTextElement = document.querySelector("#recipe-text")
const ingridientsElement = document.querySelector("#ingridients")

recipeNameElement.textContent = recipe.name
recipeTextElement.textContent = recipe.text

ingridients.forEach(element => {
    const liElement = document.createElement("li")
    liElement.setAttribute("id", "ingridient")
    liElement.textContent = element.name
    ingridientsElement.appendChild(liElement)
})

document.querySelector("#edit-recipe").addEventListener("click", (e) => {
    e.preventDefault()
    location.assign(`add-recipe.html#${recipeId}`)
})


console.log(recipe)