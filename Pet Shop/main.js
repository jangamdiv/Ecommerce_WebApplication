let cartItems = []; // Assuming you are storing the cart items here
let data = JSON.parse(localStorage.getItem("data")); // signup data 
let Petlover = JSON.parse(localStorage.getItem("Petlover")); // login data

console.log(data, Petlover);
console.log(typeof Petlover);

let input = document.querySelector("input");
let BuyPet = document.querySelector("#BuyPet");

// Fetch pets based on their status
async function ProductsData(status) {
    let dataFromServer = await fetch(`https://petstore.swagger.io/v2/pet/findByStatus?status=${status}`);
    let ConvertedData = await dataFromServer.json();
    console.log('Fetched Data:', ConvertedData); // Check the structure
    return ConvertedData;
}

// Function to display the fetched pets
function displayPets(pets) {
    const searchResult = document.getElementById("searchResult");
    searchResult.innerHTML = ''; // Clear previous results

    if (pets.length === 0) {
        searchResult.innerHTML = "No pets found for the selected status.";  // Show message when no pets found
        return;
    }

    pets.forEach(pet => {
        let card = document.createElement('div');
        card.classList.add('pet-card');
        
        let petImage = document.createElement('img');
        
        // Check if pet has a valid image URL, else use a fallback image
        const validImageUrl = pet.photoUrls[0] && pet.photoUrls[0] !== "string" ? pet.photoUrls[0] : 'https://via.placeholder.com/150';
        
        petImage.src = validImageUrl;  // Set image source
        petImage.alt = pet.name;
        card.appendChild(petImage);

        let petName = document.createElement('h3');
        petName.textContent = pet.name;
        card.appendChild(petName);

        let petStatus = document.createElement('p');
        petStatus.textContent = `Status: ${pet.status}`;
        card.appendChild(petStatus);

        let petId = document.createElement('p');
        petId.textContent = `ID: ${pet.id}`;
        card.appendChild(petId);

        let buyButton = document.createElement('button');
        buyButton.textContent = 'Buy Pet';
        buyButton.addEventListener('click', () => {
            // Logic to add pet to cart
            addToCart(pet);
        });
        card.appendChild(buyButton);

        searchResult.appendChild(card);
    });
}


// Add selected pet to cart
function addToCart(pet) {
    cartItems.push(pet); // Add pet to cart
    localStorage.setItem("cartItems", JSON.stringify(cartItems)); // Save to localStorage
    console.log(`Pet added to cart: ${pet.name}`);
}

// Search button click handler
document.getElementById("searchBtn").addEventListener("click", async () => {
    let selectedStatus = document.getElementById("petSearchDropdown").value.toLowerCase(); // Ensure lowercase status
    console.log('Selected Status:', selectedStatus); // Log the selected status

    // Fetch pets for the selected status
    let pets = await ProductsData(selectedStatus);
    document.body.style.backgroundImage = "none";
    document.body.style.backgroundColor = "rgb(84, 44, 78)";
    // Check if there are pets for the selected status and display them
    if (pets && pets.length > 0) {
        displayPets(pets); // Display pets based on selected status
    } else {
        document.getElementById("searchResult").innerHTML = "No pets found for the selected status."; // Display no pets found message
    }
});


