"use strict";

const URL = window.location.href;
const pageTag = URL.slice(URL.indexOf("?") + 5); // This checks the URL and takes the part after "?tag="

document.querySelector(`.page-title`).innerHTML = `<b>${pageTag.toUpperCase()}</b>`;

fetch(`https://foodog.herokuapp.com/articles`)
    .then(response => {
        if (response.ok) {
            response.json()
                .then(articles => {
                    for (let i = 0; i < articles.docs.length; i++) {
                        let article = articles.docs[i];
                        let currentTags = articles.docs[i].tagForArticle.join(' ').toLowerCase().split(' ');
                        if (currentTags.includes(pageTag)) { // ID matches the ID from the URL
                            createArticle(article.imgUrl, currentTags, article.title, article.text, article._id);
                        }
                    }
                });
        }
        else {
            console.log('Network request failed with response ' + response.status + ': ' + response.statusText);
        }
    });

let articleTitle, articleText, articleTags, articleImage;


/**
 * 
 * @param {*} img 
 * @param {*} tags 
 * @param {*} title 
 * @param {*} text 
 * @param {*} id 
 */

const createArticle = (img, tags, title, text, id) => {
    const HTMLCode = `
        </hr>
            <div class="row centered">
                <img class="offset-2" src="${img}" id="imagenes">
                <div class="col-3 col-md-4">
                    <p id="nutri">${tags.join(' ').toUpperCase()}</p>
                    <a href="single-page.html?id=${id}">${title.toUpperCase()}</a>
                    <p id="nutri-texto">${shortenText(text, 40)}</p>
                    <div class="share">
                        <div class="d-flex aling-content-start flex-wrap">
                            <i class="fas fa-share" id="share-icon"></i>
                        </div>
                        <p class="share-text">SHARE</p>
                    </div>
                </div>
            </div>
        
        <hr>
        `;
    const mainContainer = document.querySelector('.main-container');   
    let newNode = document.createElement("div");
    newNode.classList.add("container");
    newNode.innerHTML = HTMLCode;
    mainContainer.append(newNode);
        



}


/** 
 * @param {String} text : Text to shorten
 * @param {Number} length : Wanted final length in words (number)
 * @return sliced text
 **/

const shortenText = (text, length) => {
    let res = text.split(' ').slice(0, length);
    res[0] = res[0].charAt(0).toUpperCase() + res[0].slice(1);
    return res.join(' ') + `...`;
}

shortenText()