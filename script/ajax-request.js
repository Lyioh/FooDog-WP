function createArticle(articles) {
    let myImg = document.querySelectorAll(".image-100")
    console.log(articles);
  
    for (let key in articles.docs) {
        myImg[key].src = articles.docs[key].imgUrl;
    }
}


fetch(`https://foodog.herokuapp.com/articles`)
    .then(response => {
        if (response.ok) {
            response.json()
            .then(articles => createArticle(articles))
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