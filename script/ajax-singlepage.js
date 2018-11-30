"use strict";

const URL = window.location.href;
const articleId = URL.substring(URL.indexOf("?")+4, URL.indexOf("&")); // This checks the URL and takes the part after "?id="
let pageArticle = URL.slice(URL.indexOf("&")+6);

let articleTitle, articleText, articleTags, articleImage;
let divImgFeature = document.querySelectorAll(".imgAjax > img")
let divTitleFeature = document.querySelectorAll(".imgAjax > a")

/*
* Randomize The article Featured FOOTER
*/
function randomRecursive(articlesObj, randomNumb, theArray, indice) {
    randomNumb = Math.floor(Math.random() * (articlesObj.docs).length);
    if (theArray.includes(randomNumb)) {
        randomRecursive(articlesObj, randomNumb, theArray, indice)
    } else {
        theArray[indice] = randomNumb;
        divImgFeature[indice].src = articlesObj.docs[randomNumb].imgUrl;
        divTitleFeature[indice].textContent = articlesObj.docs[randomNumb].title;
    }
}
/*
* Picture Artcile Featured FOOTER
*/
function articlesFeatures(articles) {
    console.log("im in")
    let randNumArray = new Array;
    for (let i = 0; i < 3; i++) {
        let randomNumber = Math.floor(Math.random() * (articles.docs).length);
        randomRecursive(articles, randomNumber, randNumArray, i)
    }
} 
/*
* Picture Instagram FOOTER
*/
function instagramFeatures(articles) {
    let instagramImg = document.querySelectorAll(".instagram-image-footer")
    for (let key in articles.docs) {
        if (key < 9) {
            instagramImg[key].src = articles.docs[key].imgUrl;
        }
    }
}
console.log(articleId);


const updateTitle = (title) => {
    const domArticleTitle = document.querySelector('.article-title');
    domArticleTitle.innerHTML = title.toUpperCase();
}

const updateText = (text) => {
    const domArticleText = document.querySelector('.paragraph-text');
    domArticleText.innerHTML = text;
}

const updateTags = (tags) => {
    const domArticleTags = document.querySelector('.article-tags');
    domArticleTags.innerHTML = tags.toUpperCase();
}

const updateImage = (imageURL) => {
    const domArticleImage = document.querySelector('.article-image');
    console.log(domArticleImage);
    domArticleImage.src = imageURL;
}


fetch(`https://foodog.herokuapp.com/articles/?page=${pageArticle}`)
    .then(response => {
        if (response.ok) {
            response.json()
                .then(articles => {
                    console.log(articles);
                    for(let i = 0; i < articles.docs.length; i++){
                        if(articles.docs[i]._id == articleId){ // ID matches the ID from the URL
                            console.table(articles.docs[i]);
                            articleTitle = articles.docs[i].title;
                            /* articleText = articles.docs[i].text; */
                            articleText = articles.docs[i].text.charAt(0).toUpperCase() + articles.docs[i].text.slice(1);
                            articleTags = articles.docs[i].tagForArticle.join(' '); // Strinfigy the array
                            articleImage = articles.docs[i].imgUrl;
                            
                            updateTitle(articleTitle);
                            updateText(articleText);
                            updateTags(articleTags);
                            updateImage(articleImage);
                        }                         
                    }
                    console.log("im in json")
                    articlesFeatures(articles)
                    instagramFeatures(articles)
                });
        }
        else {
            console.log('Network request failed with response ' + response.status + ': ' + response.statusText);
        }
    });
