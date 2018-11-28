function createArticle(articles) {
    const domImg = document.querySelectorAll(".image-100")
    const domTitles = document.querySelectorAll('.article-title');
    const domSynopsis = document.querySelectorAll('.article-synopsis');
    const domTags = document.querySelectorAll('.orange-tag');
    console.log(domTitles);
    console.log(articles);

    for (let key in articles.docs) {
        domImg[key].src = articles.docs[key].imgUrl;
        domTitles[key].innerHTML = articles.docs[key].title;

        if (key == 0) {
            let tags = articles.docs[key].tagForArticle.join(" ");
            /*console.log(tags);
            console.log(domTags[0]);*/
            domTags[0].innerHTML = tags;
        }
        else if (key >= 5) { // SKIP FIRST RIGHT SECTION FOR TAGS
            let tags = articles.docs[key].tagForArticle.join(" ");
            console.log(domTags);
            console.log(tags);
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
        body : JSON.stringify({"title":"blob()", "text": `This example builds a FormData instance containing values for fields named "username", "accountnum", "userfile" and "webmasterfile", then uses the XMLHttpRequest method send() to send the form's data. The field 'webmasterfile' is a Blob. A Blob object represents a file-like object of immutable, raw data. Blobs represent data that isn't necessarily in a JavaScript-native format. The File interface is based on Blob, inheriting blob functionality and expanding it to support files on the user's system. In order to build a Blob you can invoke the Blob() constructor.`, "tags":["Wellness", "test"], "image": `http://webmalin.ch/wp-content/uploads/2016/09/Post-Blob-Jump-Piscine-Thonon-Ultimate-Family-D3S_1496-39.jpg` })
    }
    console.log("ok2")
    fetch(url, init)
        .then(response => {
            if (response.ok) {
                console.log("reponseok")
                .then(console.log(response.json()))
                
            } else {
                console.log('Network request failed with response ' + response.status + ': ' + response.statusText);
            }
        })
} 

letsPost(); */