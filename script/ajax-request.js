function createArticle(articles) {
    const domImg = document.querySelectorAll(".image-100")
    const domTitles = document.querySelectorAll('.article-title');
    const domSynopsis = document.querySelectorAll('.article-synopsis');
    const domTags = document.querySelectorAll('.orange-tag');
    const domNavbar = document.querySelector('.navbar-element');
    console.log(articles);

    let navbarCategories = []; // Will contain every possible tag

    for (let key in articles.docs) {
        console.log(key);
        console.log(domImg);
        domImg[key].src = articles.docs[key].imgUrl;
        domTitles[key].innerHTML = articles.docs[key].title;
        domTitles[key].href = `single-page.html?id=${articles.docs[key]._id}`; // Generate article links

        /* 
        * GENERATE NAVBAR CATEGORIES
        */

        /*
        articles.docs[key].tagForArticle.map((tag) => {
            if (!navbarCategories.includes(tag.toLowerCase()))
                navbarCategories.push(tag.toLowerCase());
        }); // Makes a copy of each tag if it's not already in the array
       */ 

        if (key == 0) {
            let tags = articles.docs[key].tagForArticle.join(" ");
            domTags[0].innerHTML = tags;
        }
        else if (key >= 5) { // SKIP FIRST RIGHT SECTION FOR TAGS
            let tags = articles.docs[key].tagForArticle.join(" ");
            domTags[key-4].innerHTML = tags;
        }

        if (key >= 5) { // SKIP THE 5 FIRST ARTICLES FOR SYNOPSIS
            let text = shortenText(articles.docs[key].text, 40); // Synopsis
            domSynopsis[key - 5].innerHTML = text;
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


fetch(`https://foodog.herokuapp.com/articles`)
    .then(response => {
        if (response.ok) {
            response.json()
                .then(articles => createArticle(articles));
        }
        else {
            console.log('Network request failed with response ' + response.status + ': ' + response.statusText);
        }
    })


/* function letsPost() {
    console.log("ok")
    const url = `https://foodog.herokuapp.com/articles`;
    let init = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify({"title":"Les arbres et les chiens", "text": `Abattre ou non les arbres qui bordent les routes ? Le ­sujet ne prête pas du tout à la polémique. Mais alors, pas du tout. « Tout le monde aime les arbres. S’il y a une polémique, elle vient de ceux qui veulent les abattre », assure Chantal Pradines, déléguée générale de l’association Allées avenues, qui œuvre « pour la promotion du patrimoine culturel, naturel et paysager que constituent les allées d’arbres ».

        « Tant qu’il y aura des extrémistes qui considèrent qu’on ne peut pas toucher au moindre arbre, la discussion sera vive », répond ­Jacques Robin, ingénieur routier à la retraite et ancien responsable des routes dans le département du Bas-Rhin.
        
        Pas de polémique, donc, sauf si elle vient du camp d’en face. On ne pensait pas que cette histoire d’arbres alignés le long des ­ex-nationales continuait de déclencher, en 2018, des débats aussi vifs. Sur l’échelle des controverses bien françaises, on n’en est certes pas au niveau des « gilets jaunes » ni du vélo en ville, mais pas loin. Deux camps s’affrontent, qui disposent chacun d’arguments trempés dans la science, des ­arguments que l’on retrouve, dans une version schématisée à l’extrême, aux comptoirs des bistrots où l’on voudra bien lancer le sujet, pour voir.`, "tags":["Wellness", "Nutrition"], "image": `https://images.pexels.com/photos/59523/pexels-photo-59523.jpeg?auto=compress%26cs=tinysrgb%26dpr=2%26h=750%26w=1260` })
    }
    console.log("ok2")
    fetch(url, init)
        .then(response => {
            if (response.ok) {
                console.log(response.json())
                
            } else {
                console.log('Network request failed with response ' + response.status + ': ' + response.statusText);
            }
        })
} 

letsPost();  */