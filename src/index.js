import uuidv4 from "uuidv4"
import { Recipe } from "./recipe"
import { getSavedRecipes } from "./recipe-functions"

const newRecipeButton = document.querySelector("#new-recipe")
const recipes = getSavedRecipes()

newRecipeButton.addEventListener("click", (e) => {

    const id = uuidv4()

    const recipe = new Recipe(id)
    recipes.push(recipe)
    localStorage.setItem("recipes", JSON.stringify(recipes))
    location.assign(`/add-recipe.html#${id}`)
})

if (recipes.length === 0) {
    const container = document.querySelector("#recipes-container")
    const textElement = document.createElement("h2")
    textElement.textContent = "You have no recipes to show. Click new recipe to add some!"
    container.appendChild(textElement)
}

recipes.forEach(element => {
    const container = document.querySelector("#recipes")
    const liElement = document.createElement("li")
    const nameElement = document.createElement("h3")
    const ingridientsLeft = document.createElement("h4")
    const viewButton = document.createElement("button")
    const editButton = document.createElement("button")

    const recipe = element

    nameElement.textContent = recipe.name

    if (recipe.ingridients.every(element => element.exists)) {
        ingridientsLeft.textContent = "You have all the ingridients for this recipe"
    } else if (recipe.ingridients.some(element => element.exists)) {
        ingridientsLeft.textContent = "You have some of the ingridients for this recipe"
    } else {
        ingridientsLeft.textContent = "You have none of the ingridients for this recipe"
    }

    viewButton.textContent = "View Recipe"
    viewButton.addEventListener("click", e => {
        e.preventDefault()
        location.assign(`/view-recipe.html#${recipe.id}`)
    })

    editButton.textContent = "Edit Recipe"
    editButton.addEventListener("click", e => {
        e.preventDefault()
        location.assign(`/add-recipe.html#${recipe.id}`)
    })

    liElement.appendChild(nameElement)
    liElement.appendChild(ingridientsLeft)
    liElement.appendChild(viewButton)
    liElement.appendChild(editButton)

    container.appendChild(liElement)
})