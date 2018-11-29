let divImgFeature = document.querySelectorAll(".imgAjax > img")

function randomRecursive(articlesObj, randomNumb, theArray, indice) {
    randomNumb = Math.floor(Math.random() * (articlesObj.docs).length) + 1;
    if (theArray.includes(randomNumb)) {
        randomRecursive(articlesObj, randomNumb, theArray, indice)
    } else {
        theArray[indice] = randomNumb;
        divImgFeature[indice].src = articlesObj.docs[randomNumb].imgUrl;
    }
}

function articlesFeatures(articles) {
    let randNumArray = new Array;
    for (let i = 0; i < 3; i++) {
        let randomNumber = Math.floor(Math.random() * (articles.docs).length) + 1;
        randomRecursive(articles, randomNumber, randNumArray, i)
    }
} 

fetch(`https://foodog.herokuapp.com/articles`)
    .then(response => {
        if (response.ok) {
            response.json()
                .then(articles => articlesFeatures(articles))
        }
        else {
            console.log('Network request failed with response ' + response.status + ': ' + response.statusText);
        }
    })