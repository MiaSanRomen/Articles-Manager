async function createNewBlock() {
    let status = []
    let id = JSON.parse(localStorage.getItem("current_id"));
    let articles = JSON.parse(localStorage.getItem("articles"));
    let article_id
    for(let i = 0; i < articles.length; i++) {
        let item = articles[i]
        if(item.id == id){
            article_id = i
        }
    }
    let blocks = []
    blocks = articles[article_id].blocks
    let block
    let block_id = JSON.parse(localStorage.getItem("current_block"));
    status.push(block_id)
    console.log("block id", block_id)


    status.push("before fill")

    let input_title = document.getElementById("title")
    let title = input_title.value

    let input_about = document.getElementById("about")
    let about = input_about.value
    status.push("after fill")

    for(let i = 0; i < blocks.length; i++) {
        let item = blocks[i]
        if(item.id == block_id){
            status.push(item)
            if (title !== ""){
                articles[article_id].blocks[i].name = title
            }
            if (about !== ""){
                articles[article_id].blocks[i].about = about
            }

            let getFileUrl = JSON.parse(localStorage.getItem("uploadedBlockUrl"));
            if(getFileUrl === ""){

            }else {
                articles[article_id].blocks[i].image = getFileUrl
                localStorage.setItem("uploadedBlockUrl", JSON.stringify(""));
            }

            status.push(articles[article_id].blocks[i].name)
        }
    }

    localStorage.setItem("articles", JSON.stringify(articles));
    localStorage.setItem("status", JSON.stringify(status));
}

function fillData(){
    let id = JSON.parse(localStorage.getItem("current_id"));
    let articles = JSON.parse(localStorage.getItem("articles"));
    for(let i = 0; i < articles.length; i++) {
        let item = articles[i]
        if(item.id == id){
            j = i
        }
    }
    let blocks = []
    blocks = articles[j].blocks
    console.log("article's blocks", articles[j].blocks)
    let block
    let block_id = JSON.parse(localStorage.getItem("current_block"));
    console.log("block id", block_id)

    for(let i = 0; i < blocks.length; i++) {
        let item = blocks[i]
        if(item.id == block_id){
            block = item
        }
    }

    let  title = document.getElementById("title")
    title.placeholder = block.name

    let  about = document.getElementById("about")
    about.placeholder = block.about

}

function saveFile(){
    let selectedFile = document.getElementById('image').files[0]
    if (!selectedFile.type.startsWith('image/')){ return }
    const reader = new FileReader();
    reader.onloadend = () => {
        const base64String = reader.result
        console.log("we save base64", base64String)
        localStorage.setItem("uploadedBlockUrl", JSON.stringify(base64String));
    };
    reader.readAsDataURL(selectedFile);
}

fillData()
console.log(status)