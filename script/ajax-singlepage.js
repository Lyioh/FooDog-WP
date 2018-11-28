"use strict";

const URL = window.location.href;
const articleId = URL.slice(URL.indexOf("?")+4); // This checks the URL and takes the part after "?id="

let articleTitle, articleText, articleTags, articleImage;

console.log(articleId);
fetch(`https://foodog.herokuapp.com/articles`)
    .then(response => {
        if (response.ok) {
            response.json()
                .then(articles => {
                    console.log(articles);
                    for(let i = 0; i < articles.docs.length; i++){
                        if(articles.docs[i]._id == articleId){ // ID matches the ID from the URL
                            console.table(articles.docs[i]);
                            articleTitle = articles.docs[i].title;
                            articleText = articles.docs[i].text;
                            articleTags = articles.docs[i].tagForArticle.join(' '); // Strinfigy the array
                            articleImage = articles.docs[i].imgUrl;
                            
                            updateTitle(articleTitle);
                            updateText(articleText);
                            updateTags(articleTags);
                            updateImage(articleImage);
                        }                         
                    }
                    
                });
        }
        else {
            console.log('Network request failed with response ' + response.status + ': ' + response.statusText);
        }
    });

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
