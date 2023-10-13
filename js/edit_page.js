async function createNewArticle() {
    let id = JSON.parse(localStorage.getItem("current_id"));
    let articles = JSON.parse(localStorage.getItem("articles"));

    let j
    for(let i = 0; i < articles.length; i++) {
        let item = articles[i]
        if(item.id == id){
            j = i
        }
    }

    let status = []

    status.push(articles[j])

    let input_title = document.getElementById("title")
    let title = input_title.value
    if (title.trim() === "" ) {
        title = articles[j].name
    }
    status.push(articles[j])
    let input_about = document.getElementById("about")
    let about = input_about.value
    if (about.trim() === "") {
        about = articles[j].about
    }
    status.push(articles[j])
    let input_intro = document.getElementById("intro")
    let intro = input_intro.value
    if (intro.trim() === "") {
        intro = articles[j].intro
    }
    status.push(articles[j])

    let getFileUrl = JSON.parse(localStorage.getItem("uploadedUrl"));
    if(getFileUrl === ""){

    }else {
        articles[j].image = getFileUrl
        localStorage.setItem("uploadedUrl", JSON.stringify(""));
    }


    articles[j].name = title
    articles[j].about = about
    articles[j].intro = intro

    status.push(articles[j])
    localStorage.setItem("articles", JSON.stringify(articles));
    localStorage.setItem("article_status", JSON.stringify(status));
}

function checkId(){
    let id = JSON.parse(localStorage.getItem("current_id"));
    if(id>=0){
        fillData(id)
    }else {
        let articles = JSON.parse(localStorage.getItem("articles"));
        let article = new Article(-1, "Title", "Intro", "About", "css/images/Article1-1.jpg", []);
        article.id = parseInt(articles[articles.length - 1].id, 10) + 1
        articles.push(article)
        localStorage.setItem("articles", JSON.stringify(articles));
        localStorage.setItem("current_id", JSON.stringify(article.id));
    }
}

function fillData(id){
    console.log("HERE AGAIN")
    let articles = JSON.parse(localStorage.getItem("articles"));
    let article = articles[id]

    let  title = document.getElementById("title")
    title.placeholder = article.name

    let  intro = document.getElementById("intro")
    intro.placeholder = article.intro

    let  about = document.getElementById("about")
    about.placeholder = article.about
    let content = document.getElementsByClassName("container_paragraph")[0]
    content.innerHTML = '';

    for(let block of Object.values(article.blocks)) {
        let item_paragraph = document.createElement("div")
        item_paragraph.className = "item_paragraph"
        let title_navbar = document.createElement("div")
        title_navbar.className = "title_navbar"
        let item_left = document.createElement("div")
        item_left.className = "item_left"
        let item_right = document.createElement("div")
        item_right.className = "item_right"
        let item_mid = document.createElement("div")
        item_mid.className = "item_right"
        let button_site = document.createElement("h2");
        button_site.textContent = "Remove"
        button_site.className = "button_site"
        button_site.setAttribute("block_id", block.id)
        button_site.onclick = function(){remove_block(button_site.getAttribute("block_id").valueOf())}
        let a = document.createElement("a");
        a.textContent = "Edit"
        a.className = "button_site"
        a.href = "EditBlock.html"
        a.setAttribute("block_id", block.id)
        a.onclick = function(){
            let id = JSON.stringify(a.getAttribute("block_id").valueOf())
            localStorage.setItem("current_block", id);
        }
        a.setAttribute("block_id", block.id)

        let h3 = document.createElement("h3");
        h3.textContent = block.name

        item_left.appendChild(h3)
        item_mid.appendChild(button_site)
        item_right.appendChild(a)
        title_navbar.appendChild(item_left)
        title_navbar.appendChild(item_right)
        title_navbar.appendChild(item_mid)
        item_paragraph.appendChild(title_navbar)
        content.appendChild(item_paragraph)

        let hr = document.createElement("hr");

        content.appendChild(hr)
    }
}

function remove_block(block_id){
    let articles = JSON.parse(localStorage.getItem("articles"));
    let id = JSON.parse(localStorage.getItem("current_id"));
    let j
    for(let i = 0; i < articles.length; i++) {
        let item = articles[i]
        if(item.id == id){
            console.log("Found it", item)
            j = i
        }
    }
    let blocks = []
    blocks = articles[j].blocks

    for(let i = 0; i < blocks.length; i++) {
        let item = blocks[i]
        if(item.id == block_id){
            articles[j].blocks.splice(i, 1)
        }
    }
    localStorage.setItem("articles", JSON.stringify(articles));
    fillData(id)
}

function new_block(){
    let articles = JSON.parse(localStorage.getItem("articles"));
    let id = JSON.parse(localStorage.getItem("current_id"));
    let j
    for(let i = 0; i < articles.length; i++) {
        let item = articles[i]
        if(item.id == id){
            j = i
        }
    }
    let blocks = []
    blocks = articles[j].blocks
    console.log(articles[j])
    console.log(blocks)
    let new_id
    if(blocks.length == 0){
        new_id = 0
    }else {
        new_id = parseInt(blocks[blocks.length - 1].id, 10) + 1
    }
    let block = new Block(new_id, "New block", "Information", "css/images/Article1-3.jpg")

    articles[j].blocks.push(block)
    localStorage.setItem("articles", JSON.stringify(articles));
    fillData(id)
}

function saveFile(){
    let selectedFile = document.getElementById('image').files[0]
    if (!selectedFile.type.startsWith('image/')){ return }
    const reader = new FileReader();
    reader.onloadend = () => {
        const base64String = reader.result
        console.log("we save base64", base64String)
        localStorage.setItem("uploadedUrl", JSON.stringify(base64String));
    };
    reader.readAsDataURL(selectedFile);
}

checkId()