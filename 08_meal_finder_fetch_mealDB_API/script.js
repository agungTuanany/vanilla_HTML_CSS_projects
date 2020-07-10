const  search             = document.getElementById("search")
const  submit             = document.getElementById("submit")
const  random             = document.getElementById("random")
const  mealsElement       = document.getElementById("meals")
const  resultHeading      = document.getElementById("result-heading")
const  single_mealElement = document.getElementById("single-meal")


// Search meal and fetch from API
function searchMeal(event) {
    event.preventDefault()

    // Clear single meal
    single_mealElement.innerHTML = ""

    // get search term
    const term = search.value

    // TODO: create your own DOM element
    // Check for empty
    if (term.trim()) {
        fetch (`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
            .then (res => res.json())
            .then (data => {
                // console.log(data)
                resultHeading.innerHTML = `<h2>Search result for '${term}':</h2>`

                if (data.meals === null) {
                    resultHeading.innerHTML = `<p>There are no search result. Try again</p>`
                }
                else {
                    mealsElement.innerHTML = data.meals.map(meal => `
                        <div class="meal">
                            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
                            <!-- XXX data-mealId is custom Attribute XXX -->
                            <div class="meal-info" data-mealId="${meal.idMeal}">
                                <h3>${meal.strMeal}</h3>
                            </div>
                        </div>
                        `
                    ).join("")
                }
            })
        // Clear search text
        search.value = ""

    }
}

// Fetch meal by id
function getMealById(mealId) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    .then(res => res.json())
        .then(data => {
             console.log(data)
            const meal = data.meals[0]

            addMealToDOM(meal)
        })
}

// Add meal to DOM
function addMealToDOM(meal) {
    const ingredients = []

    for (let i = 1; i<= 20; i++) {
        if (!meal[`strIngredient${i}`]) {
            break
        }
        else {
            // XXX concate stringInredient with strMeasure XXX
            ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`)
        }
    }
    console.log (ingredients)

    single_mealElement.innerHTML = `
        <div class="single-meal">
            <h1>${meal.strMeal}</h1>
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
            <div class="single-meal-info">
                ${meal.strCategory ? `<h3>${meal.strCategory}</h3>`: ""}
                ${meal.strArea ? `<p>${meal.strArea}</p>`: ""}
                ${meal.strTags ? `<p>${meal.strTags}</p>`: ""}
            </div>
            <div class="main">
                <p>${meal.strInstructions}</p>
                <h2>Ingredients</h2>
                <ul>
                    ${ingredients.map(ingredients => `<li>${ingredients}</li>`).join("")}
                </ul>
                <!-- XXX TODO: implement video XXX -->
                <!--
                <video src="${meal.strYoutube}" class="screen"></video>
                <div class="controls">
                    <button class="btn" id="play">
                        <i class="fa fa-play fa-2x"></i>
                    </button>
                    <button class="btn" id="stop">
                        <i class="fa fa-stop fa-2x"></i>
                    </button>
                    <input type="range" id="progress" class="progress" min="0" max="100" step="0.1" value="0" />
                    <span class="timestamp" id="timestamp">00:00</span>
                </div>
                -->
    `;
}

// Meal on click
function mealOnClick(el) {
    const mealInfo = el.composedPath().find(item => {
        if (!item.classList) {
            return false
        }
        else {
            return item.classList.contains("meal-info")
        }
    })
    // console.log (mealInfo)
    if (mealInfo) {
        const mealId = mealInfo.getAttribute("data-mealId")
        // console.log (mealId)
        getMealById(mealId)
    }
}



// Event Listener
submit.addEventListener("submit", searchMeal)

mealsElement.addEventListener("click", mealOnClick)

