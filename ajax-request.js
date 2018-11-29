/*
Tag (Nutrition)
Title of the page
Middle Image
The text paragraphe
3 Images
3 Texts that are unde the images
*/

function createArticle(articles) {
    let myImg = document.querySelector('#middle-img')
    let bigText = document.querySelector('#text')
    let littleImages = document.querySelectorAll('#ulMayInterest img')
    let textUnderImages = document.querySelectorAll('#ulMayInterest p')
    console.log(articles)
    
    myImg.src = articles.docs[0].imgUrl
    bigText.innerHTML = articles.docs[0].text
    
    for (let key in articles.docs) {
        if (key < 3) {
            littleImages[key].src = articles.docs[key].imgUrl
            let text = firstLetter(articles.docs[key].title)
            textUnderImages[key].innerHTML = text
        }
    }
}

const firstLetter = (text, length) => {
    let res = text.split(' ').slice(0, length)
    res[0] = res[0].charAt(0).toUpperCase() + res[0].slice(1)
    return res.join(' ') + `...`
}

fetch('https://foodog.herokuapp.com/articles')
.then(response => {
    if (response.ok) {
        response.json()
        .then(articles => createArticle(articles))
    } else {
        console.log('Network request failed with response ' + response.status + ': ' + response.statusText)
    }
})