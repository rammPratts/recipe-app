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
    const container = document.querySelector("#recipes-container")
    const liElement = document.createElement("div")
    const nameElement = document.createElement("h3")
    const ingridientsLeft = document.createElement("h4")
    const viewButton = document.createElement("button")
    const editButton = document.createElement("button")
    const divider = document.createElement("div")


    const recipe = element

    divider.classList.add("divider")
    liElement.classList.add("section")

    nameElement.textContent = recipe.name

    if (recipe.ingridients.every(element => element.exists)) {
        ingridientsLeft.textContent = "You have all the ingridients for this recipe"
    } else if (recipe.ingridients.some(element => element.exists)) {
        ingridientsLeft.textContent = "You have some of the ingridients for this recipe"
    } else {
        ingridientsLeft.textContent = "You have none of the ingridients for this recipe"
    }

    viewButton.textContent = "View Recipe"
    viewButton.classList.add("btn", "waves-effect", "waves-light")
    viewButton.addEventListener("click", e => {
        e.preventDefault()
        location.assign(`/view-recipe.html#${recipe.id}`)
    })

    editButton.textContent = "Edit Recipe"
    editButton.classList.add("btn", "waves-effect", "waves-light")
    editButton.addEventListener("click", e => {
        e.preventDefault()
        location.assign(`/add-recipe.html#${recipe.id}`)
    })

    liElement.appendChild(divider)
    liElement.appendChild(nameElement)
    liElement.appendChild(ingridientsLeft)
    liElement.appendChild(viewButton)
    liElement.appendChild(editButton)

    container.appendChild(liElement)
})