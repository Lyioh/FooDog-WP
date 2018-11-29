function createArticle(articles) {
    let myImg = document.querySelectorAll(".image-100")
    console.log(articles);
  
   /*  for (let key in articles.docs) {
        myImg[key].src = articles.docs[key].imgUrl;
    } */
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