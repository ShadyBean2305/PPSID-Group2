function test(){
    console.log("The page can see the most up to date version of code")
}

let jsonData;
let cocktailKeys;
let currentCocktailIndex = 0;
let isRandomStart = false;
let isModalOpen = false;

function openModal() {
    document.getElementById('loginModal').style.display = 'block';
    isModalOpen = true;
}

// Function to close the modal
function closeModal() {
    document.getElementById('loginModal').style.display = 'none';
    setTimeout(function() {
        isModalOpen = false; // Set the modal state as closed after a short delay
    }, 100);
}



document.addEventListener('DOMContentLoaded', (event) => {
    var hoverArea = document.getElementById('hoverArea');
    var navbar = document.getElementById('navbar');

    hoverArea.addEventListener('mouseenter', function() {
        console.log('Hover area entered'); // This should appear in the console when you hover over the top area.
        navbar.classList.add('show');
    });

    navbar.addEventListener('mouseleave', function() {
        console.log('Navbar left'); // This should appear in the console when you leave the navbar area.
        navbar.classList.remove('show');
    });
});

function csvToJson(csv) {
    const lines = csv.trim().split('\n');
    const headers = lines[0].split(',');
    const result = [];

    for (let i = 1; i < lines.length; i++) {
        let obj = {};
        const currentLine = lines[i].split(',');
        for (let j = 0; j < headers.length; j++) {
            obj[headers[j]] = currentLine[j];
        }
        result.push(obj);
    }

    const grouped = result.reduce((acc, curr) => {
        if (!acc[curr.Drink]) {
            acc[curr.Drink] = {
                Drink: curr.Drink,
                Glass: curr.Glass,
                HowToMix: curr["HowToMix\r"].trim(),
                Ingredients: []
            };
        }
        acc[curr.Drink].Ingredients.push({
            Ingredient: curr.Ingredient,
            Amount: curr.Amount,
            IngredientUse: curr.IngredientUse
        });
        return acc;
    }, {});

    return grouped;
}

function displayCocktail(cocktailData) {
    const cocktailSection = document.querySelector('.cocktail');

    cocktailSection.querySelector('.cocktail-name').textContent = cocktailData.Drink;
    cocktailSection.querySelector('.cocktail-glass').textContent = cocktailData.Glass;

    const ingredientsList = cocktailSection.querySelector('.cocktail-ingredients');
    ingredientsList.innerHTML = '';

    for (const ingredient of cocktailData.Ingredients) {
        const listItem = document.createElement('li');
        listItem.textContent = `${ingredient.Amount} of ${ingredient.Ingredient} - ${ingredient.IngredientUse}`;
        ingredientsList.appendChild(listItem);
    }

 
    cocktailSection.querySelector('.cocktail-how-to-mix').textContent = cocktailData.HowToMix;

    const drinkCounter = document.querySelector('.drink-counter');
    drinkCounter.textContent = `${currentCocktailIndex + 1} of ${cocktailKeys.length}`;
}



// Function to cycle through cocktails
function cycleCocktails() {
    if (isModalOpen) {
        return; // Exit the function if the modal is open
    }

    // Update the current cocktail index and wrap around if needed
    currentCocktailIndex = (currentCocktailIndex + 1) % cocktailKeys.length;  
    displayCocktail(jsonData[cocktailKeys[currentCocktailIndex]]);
}

// Attach the cycling function to a click event on the body
document.body.addEventListener('click', cycleCocktails);

// Fetch and process cocktail data
fetch('cocktails.csv')
    .then(response => response.text())
    .then(data => {
        jsonData = csvToJson(data);
        cocktailKeys = Object.keys(jsonData);

        // Initialize the first cocktail display
        if (isRandomStart) {
            currentCocktailIndex = Math.floor(Math.random() * cocktailKeys.length);
        } else {
            currentCocktailIndex = 0;
        }
        displayCocktail(jsonData[cocktailKeys[currentCocktailIndex]]);
    })
    .catch(error => console.error('Error fetching the CSV:', error));

// Assuming the same structure and functions from the provided JS earlier