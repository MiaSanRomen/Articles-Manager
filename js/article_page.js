function fill_data(id)
{
    let articles = JSON.parse(localStorage.getItem("articles"));
    let article = articles[id]
    let name = document.getElementById("name_article")
    name.textContent = article.name
    let intro = document.getElementById("intro_article")
    intro.textContent = article.intro
    let image = document.getElementById("image_article")
    image.src = article.image

    for(let block of Object.values(article.blocks)) {
        let content = document.getElementsByClassName("content").item(0)
        let block_info = document.createElement("div")
        block_info.className = "block_info"
        let block_txt_img = document.createElement("div")
        block_txt_img.className = "block_txt_img"
        let intro = document.createElement("div")
        intro.className = "intro"
        let item_left = document.createElement("div")
        item_left.className = "item_left"
        let name = document.createElement("h2");
        name.textContent = block.name
        let about = document.createElement("p");
        about.textContent = block.about
        let image = document.createElement("img");
        image.src = block.image
        image.className = "picture"

        item_left.appendChild(image)
        intro.appendChild(name)
        intro.appendChild(about)
        block_txt_img.appendChild(intro)
        block_txt_img.appendChild(item_left)

        block_info.appendChild(block_txt_img)

        let hr = document.createElement("hr");

        content.appendChild(hr)
        content.appendChild(block_info)
    }

    console.log("articles", articles)
}

async function removeArticle() {
    articles = JSON.parse(localStorage.getItem("articles"));
    articles.pop()
    localStorage.setItem("articles", JSON.stringify(articles));
    window.location.href = "https://wiki-clone-pedia.netlify.app/main"
}

let id = JSON.parse(localStorage.getItem("current_id"))
console.log(id)
fill_data(id)