document.querySelector("#loupe").addEventListener("click", function searchBarDisplay() {
    if (document.querySelector("#searchInput").style.display === "inline-block") {
        document.querySelector("#searchInput").style.display = "none";
    }
    else {
        document.querySelector("#searchInput").style.display = "inline-block";
    }
})

document.querySelector("#searchInput").addEventListener("keypress", function enterPressed(event) {
    if (event.key === "Enter") {
        document.querySelector("#searchInput").style.display = "none";
    }
})