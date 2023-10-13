function loadData() {
    localStorage.setItem("current_id", JSON.stringify(-1));
    let articles = []
    articles = JSON.parse(localStorage.getItem("articles"))
    localStorage.setItem("uploadedUrl", JSON.stringify(""));
    localStorage.setItem("uploadedBlockUrl", JSON.stringify(""));

    //articles = reset()
    if (articles == null) {
        articles = reset()
    }
    localStorage.setItem("articles", JSON.stringify(articles));


    fill_search_data()
    let search_articles = []
    search_articles = JSON.parse(localStorage.getItem("search_articles"))
    let search_value = JSON.parse(localStorage.getItem("search_value"))
    let fill_search = document.getElementById("search_value")
    if(search_value !== ""){
        fill_search.placeholder = ":" + search_value
    }else {
        fill_search.placeholder = "Search page"
    }
    console.log("HOW WE SEARCHED", search_value)
    console.log("WHAT WE SEARCHED", search_articles)



    console.log("articles", articles)
    let  ul = document.getElementById("articles_list")


    for(let article of search_articles)
    {
        let li = document.createElement("li")
        li.className = "item_left"
        let image = document.createElement("img");
        image.src = article.image
        let div = document.createElement("div");
        let name = document.createElement("h4");
        name.textContent = article.name
        let about = document.createElement("p");
        about.textContent = article.about
        let link = document.createElement("a");
        link.setAttribute("article_id", article.id)
        link.className = "button_site"
        link.textContent = "Learn more..."
        link.href="Article.html"
        link.onclick = function(){goToArticle(link.getAttribute("article_id").valueOf())}

        let card = document.createElement("div")
        card.className = "card"

        card.appendChild(image)
        div.appendChild(name)
        div.appendChild(about)
        div.appendChild(link)
        card.appendChild(div)

        li.appendChild(card)

        ul.appendChild(li)
    }
}

function reset() {
    let users = []
    localStorage.setItem("search_value", JSON.stringify(""));
    let user = new User(0, "admin", "admin", "admin");

    users.push(user)
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("current_user", JSON.stringify("none"));

    let articles = []
    let blocks = []


    let new_block = new Block(0,"Block 1", "Block 1 Block 1 Block 1 Block 1 Block 1", "css/images/Article1-3.jpg");
    blocks.push(new_block);
    new_block = new Block(1,"Block 2", "Block 2 Block 2 Block 2 Block 2 Block 2", "css/images/Article1-3.jpg");
    blocks.push(new_block);

    let new_article = new Article(0,"Athens", "Capital of Greece", "Founded at 508 BC", "css/images/leg2.jpg", blocks);
    articles.push(new_article);
    new_article = new Article(1,"Rome", "Rome, Italian Roma, historic city and capital of Roma provincia (province), of Lazio regione (region), and of the country of Italy. Rome is located in the central portion of the Italian peninsula, on the Tiber River about 15 miles (24 km) inland from the Tyrrhenian Sea. Once the capital of an ancient republic and empire whose armies and polity defined the Western world in antiquity and left seemingly indelible imprints thereafter, the spiritual and physical seat of the Roman Catholic Church, and the site of major pinnacles of artistic and intellectual achievement, Rome is the Eternal City, remaining today a political capital, a religious centre, and a memorial to the creative imagination of the past.", "Founded at 753 BC", "css/images/rome.jpg", blocks);
    articles.push(new_article);
    return articles
}

function goToArticle(id) {
    console.log(id)
    localStorage.setItem("current_id", JSON.stringify(id));
}

function auth(){
    let user = JSON.parse(localStorage.getItem("current_user"))
    let users = JSON.parse(localStorage.getItem("users"))
    let first_nav = document.getElementById("first_nav")
    let second_nav = document.getElementById("second_nav")
    if(user === "none"){
        let a = document.createElement("a")
        a.textContent = "Login"
        a.href = "Login.html"
        a.className = "header_link"
        first_nav.appendChild(a)
        a = document.createElement("a")
        a.textContent = "Register"
        a.href = "Register.html"
        a.className = "header_link"
        second_nav.appendChild(a)
    }else {
        let username = user.name
        console.log("HERE IS", user)
        console.log("HERE IS", username)
        let a = document.createElement("a")
        a.textContent = user
        a.className = "header_link"
        first_nav.appendChild(a)
        a = document.createElement("a")
        a.textContent = "Log out"
        a.href = "index.html"
        a.className = "header_link"
        a.onclick = logout
        second_nav.appendChild(a)
    }
    console.log("CURRENT USER", user)
    console.log("ALL USERS", users)
}
function logout(){
    localStorage.setItem("current_user", JSON.stringify("none"));
}

function search(a){
    let text = document.getElementById("search_value").value.toLowerCase()
    if(a === 1){
        localStorage.setItem("search_value", JSON.stringify(""));

    }else {
        localStorage.setItem("search_value", JSON.stringify(text));

    }
    fill_search_data()
}

function fill_search_data(){
    let text = JSON.parse(localStorage.getItem("search_value"))
    let articles = JSON.parse(localStorage.getItem("articles"))
    let search_articles = []
    for(let article of articles){
        let name = article.name.toLowerCase()
        if (name.includes(text)){
            search_articles.push(article)
            console.log(article)
        }
    }
    localStorage.setItem("search_articles", JSON.stringify(search_articles));
    console.log(text)
}


loadData()
auth()
