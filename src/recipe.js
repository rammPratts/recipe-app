import { getSavedRecipes, saveRecipes, renderIngridients, saveRecipe, getRecipeIndex, saveIngridient } from "./recipe-functions"
import { unwatchFile } from "fs";


const recipes = getSavedRecipes()
const recipeId = location.hash.substring(1)
const recipeIndex = getRecipeIndex(recipeId)


const recipeTitleElement = document.querySelector("#recipe-name")
const recipeTextElement = document.querySelector("#recipe-text")
const saveRecipeElement = document.querySelector("#save-recipe")
const saveIngridientElement = document.querySelector("#add-ingridient")


export class Ingridients {
    constructor(id, name) {
        this.id = id
        this.name = name
        this.exists = false
    }
}

export class Recipe {
    constructor(id) {
        this.id = id
        this.name = ""
        this.text = ""
        this.ingridients = []
    }
}

renderIngridients(recipes, recipeIndex)

if (recipes[recipeIndex]) {
    recipeTitleElement.value = recipes[recipeIndex].name
    recipeTextElement.textContent = recipes[recipeIndex].text
    renderIngridients(recipeIndex)
}

//Saves the recipe when clicking the add button
if (saveRecipeElement) {
    saveRecipeElement.addEventListener("click", (e) => {
        e.preventDefault()
        saveRecipe(recipes, recipeIndex, recipeTitleElement, recipeTextElement)
        renderIngridients(recipeIndex)
        location.assign("/")
    })
}


// Add ingridients
if (saveIngridientElement) {
    saveIngridientElement.addEventListener("click", (e) => {
        e.preventDefault()
        saveIngridient(recipes, recipeIndex)
        renderIngridients(recipes, recipeIndex)
    })
}

if (document.querySelector("#return-button")) {
    document.querySelector("#return-button").addEventListener("click", e => {
        e.preventDefault()
        location.assign("/")
    })
}

if (document.querySelector("#delete-recipe")) {
    document.querySelector("#delete-recipe").addEventListener("click", e => {
        e.preventDefault()
        const deletedRecipe = recipes.splice(recipeIndex, 1)
        saveRecipes(recipes)
        location.assign("/")
        console.log(deletedRecipe)
        console.log(recipes)
    })
}
