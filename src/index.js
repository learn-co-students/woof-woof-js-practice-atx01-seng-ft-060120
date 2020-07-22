const dogsURL = `http://localhost:3000/pups`;

document.addEventListener('DOMContentLoaded', () => {
    
    getDogs();
    getGoodDogs();
    
});

function getDogs(){
    fetch(dogsURL)
    .then(response => response.json())
    .then(json => {
        for(const dog of json){
            createDog(dog);
        }
    });
};

function createDog(dog){
    const dogBar = document.getElementById('dog-bar');
    const span = document.createElement('span');

    span.innerText = dog.name;

    span.addEventListener('click', () => {
        console.log(dog);
        fillDogInfo(dog);
    });

    dogBar.appendChild(span);
};

function getGoodDogs(){
    const goodDogFilterButton = document.getElementById('good-dog-filter');

    goodDogFilterButton.addEventListener('click', () => {
        if (goodDogFilterButton.innerText === "Filter good dogs: OFF") {
            
            goodDogFilterButton.innerText = "Filter good dogs: ON";

            document.getElementById('dog-bar').innerHTML = "";

            fetch(dogsURL)
            .then(response => response.json())
            .then(json => {
                for(const dog of json){
                    if (dog.isGoodDog === true){
                        createDog(dog);
                    }
                }
            });
        } else {
            
            goodDogFilterButton.innerText = "Filter good dogs: OFF";

            document.getElementById('dog-bar').innerHTML = "";

            getDogs()
        };
    });
};

function fillDogInfo(dog){
    const dogInfoDiv = document.getElementById('dog-info');

    dogInfoDiv.innerHTML = `
        <img src="${dog.image}" alt="${dog.name} width="200" height="300">
        <h2>${dog.name}</h2>
        <button></button>
    `;

    const button = dogInfoDiv.getElementsByTagName('button')[0];

    if (dog.isGoodDog === false){
        button.innerText = "Good Dog!";
    } else {
        button.innerText = "Bad Dog!";
    };

    button.addEventListener('click', () => {
        patchDog(dog);
        console.log(dog);
    });
};

function patchDog(dog){
    dog.isGoodDog = !dog.isGoodDog;
    
    fetch(`${dogsURL}/${dog.id}`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify(dog)
    })
    .then(response => response.json())
    .then(json => fillDogInfo(json))
}