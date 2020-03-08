let ipUrl = "http://127.0.0.1:7001/admin/";

let service = {
    checkLogin:ipUrl+"checkLogin",
    getType:ipUrl+"getType",
    addArticle:ipUrl+"addArticle",
    updateArticle:ipUrl+"updateArticle",
    getArticleList:ipUrl+"getArticleList",
    delArticle:ipUrl+"delArticle/",
    getArticleDetail:ipUrl+"getArticleById/"
}

export default service