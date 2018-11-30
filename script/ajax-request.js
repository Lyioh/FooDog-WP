let divImgFeature = document.querySelectorAll(".imgAjax > img")
let divTitleFooter = document.querySelectorAll(".imgAjax > a")
let storagePage = document.querySelector("#page")
let numberPagination = 1;

function createArticle(articles, pageNumber) {
    const domImg = document.querySelectorAll(".image-100")
    const domTitles = document.querySelectorAll('.article-title');
    const domSynopsis = document.querySelectorAll('.article-synopsis');
    const domTags = document.querySelectorAll('.orange-tag');
    console.log(articles);
    if (articles.page == pageNumber) {
        for (let key in articles.docs) {
            domImg[key].src = articles.docs[key].imgUrl;
            domTitles[key].innerHTML = articles.docs[key].title;
            domTitles[key].href = `single-page.html?id=${articles.docs[key]._id}&page=${articles.page}`; // Generate article links

            if (key == 0) {
                let tags = articles.docs[key].tagForArticle.join(" ");
                domTags[0].innerHTML = tags;
            }
            else if (key >= 5) { // SKIP FIRST RIGHT SECTION FOR TAGS
                let tags = articles.docs[key].tagForArticle.join(" ");
                domTags[key - 4].innerHTML = tags;
            }
            

            if (key >= 5) { // SKIP THE 5 FIRST ARTICLES FOR SYNOPSIS
                let text = shortenText(articles.docs[key].text, 40); // Synopsis
                domSynopsis[key - 5].innerHTML = text;
            }
        }
    }
    else if (articles.page == (pageNumber + 1)) {
        for (let myKey in articles.docs) {
            myKey = parseInt(myKey);
            if (myKey < 4) {
                domImg[myKey + 10].src = articles.docs[myKey].imgUrl;
                domTitles[myKey + 10].innerHTML = articles.docs[myKey].title;
                domTitles[myKey + 10].href = `single-page.html?id=${articles.docs[myKey]._id}&page=${articles.page}`;
                let texts = shortenText(articles.docs[myKey].text, 40); // Synopsis
                domSynopsis[myKey + 5].innerHTML = texts;
            }
        }
    }
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

/*
* Randomize The article Featured FOOTER
*/
function randomRecursive(articlesObj, randomNumb, theArray, indice) {
    let theTitle = "";
    randomNumb = Math.floor(Math.random() * (articlesObj.docs).length);
    if (theArray.includes(randomNumb)) {
        randomRecursive(articlesObj, randomNumb, theArray, indice);
    }
    else {
        theArray[indice] = randomNumb;
        divImgFeature[indice].src = articlesObj.docs[randomNumb].imgUrl;
        divTitleFooter[indice].href = `single-page.html?id=${articlesObj.docs[randomNumb]._id}`;
        if (articlesObj.docs[randomNumb].title.length > 28) {
            theTitle = shortenText(articlesObj.docs[randomNumb].title, 7);
            divTitleFooter[indice].textContent = theTitle;
        }
        else {
            divTitleFooter[indice].textContent = articlesObj.docs[randomNumb].title;
        }
    }
}
/*
* Picture Artcile Featured FOOTER
*/
function articlesFooter(articles) {
    let randNumArray = new Array;
    for (let i = 0; i < 3; i++) {
        let randomNumber;
        randomRecursive(articles, randomNumber, randNumArray, i);
    }
}
/*
* Picture Instagram FOOTER
*/
function instagramFooter(articles) {
    let instagramImg = document.querySelectorAll("#instagram-image-footer")
    for (key in articles.docs) {
        if (key < 9) {
            instagramImg[key].src = articles.docs[key].imgUrl;
        }
    }
}
function loadPage(pageNumber) {
    fetch(`https://foodog.herokuapp.com/articles/?page=${pageNumber}`)
        .then(response => {
            if (response.ok) {
                response.json()
                    .then(articles => {
                        createArticle(articles, pageNumber);
                        articlesFooter(articles);
                        instagramFooter(articles);
                    })
            }
            else {
                console.log('Network request failed with response ' + response.status + ': ' + response.statusText);
            }
        })

    fetch(`https://foodog.herokuapp.com/articles/?page=${pageNumber + 1}`)
        .then(response => {
            if (response.ok) {
                response.json()
                    .then(secondArticle => createArticle(secondArticle, pageNumber))
            }
            else {
                console.log('Network request failed with response ' + response.status + ': ' + response.statusText);
            }
        })
}

loadPage(numberPagination);

document.querySelector("#pagination").addEventListener("click", function getPageNumber(event) {
    let pageArray = document.querySelectorAll(".page-link")
    let myNumber = event.target.textContent;
    myNumber = parseInt(myNumber);
    loadPage(myNumber);
    pageArray[0].innerHTML = myNumber;
    pageArray[1].innerHTML = myNumber + 1;
    document.documentElement.scrollTop = 0;
})
