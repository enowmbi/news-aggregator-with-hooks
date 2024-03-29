import Article from '../components/article';

const Articles = (props) =>{
    return(
        <ul id="listOfArticles" className="media-list">
        {
            props.articles.map(article =>(
                <li key ={`${article.id}-${article.title}`}>
                <Article 
                id = {article.id}
                name = {article.name}
                author = {article.author}
                title = {article.title}
                description ={article.description}
                url = {article.url}
                urlToImage = {article.urlToImage}
                publishedAt = {article.publishedAt}
                content = {article.content}
                />
                </li>
            )
            )
        }
        </ul>
    )
}

export default Articles
