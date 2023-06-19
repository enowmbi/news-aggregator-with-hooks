import React from 'react'
import { useState, useEffect } from 'react'
import Header from './components/header'
import Footer from './components/footer'
import Main from './components/main'
import './App.css'
import { getSources }  from './sources'
import { getArticles }  from './articles'
import Articles from './components/articles'
import axios from 'axios'

const App = () =>{

    // state = {
        // newsSources: [],
        // errors: [],
        // selectedSource: { },
        // newsArticles:[]
    // }
    const [newsSources, setNewsSources] = useState([])
    // const [errors, setErrors] = useState([])
    // const [selectedSource, setSelectedSource] = useState([])
    // const [newsArticles, setNewsArticles] = useState([])

    useEffect(()=>{

    // componentDidMount(){
    //     // const url = 'https://newsapi.org/v2/top-headlines?language=en&apiKey=c493e95394d444458f3488052428deab' 
        //connect to the api here
        try{
            // const promise = axios.get(url)
            // const promiseData = promise.response
            // console.log(promiseData)
            const sources = newsSources.sources;
            console.log(sources)
            this.setNewsSources(sources)
            // this.setState({ newsSources:sources });
        }
        catch(error){
            console.log(error);
            const newsSources = getSources();
            this.setState({newsSources});
        }
    })

       const  handleNewsSourceSelectionChanged = (selected_source) =>{
           console.log(selected_source)
            //change the source and update state 
            const sources  = newsSources
            const userSelectedSource = sources.find(source =>source.id === selected_source.trim())
            // this.setState({selectedSource: userSelectedSource})
            this.setSelectedSource(userSelectedSource)

            // display articles from the selected source 
            this.handleDisplayArticles(selected_source)
        }

        const handleDisplayArticles=(selected_source)=>{
            console.log(selected_source)
            //get articles from url based on source
            const url = `https://newsapi.org/v2/top-headlines?language=en&source=${selected_source}&apiKey=c493e95394d444458f3488052428deab`;

            try{
                const { data: sources } = axios.get(url);
                const articles = sources.articles;
                // this.setState({newsArticles: articles});
                this.setNewsArticles(articles)
            }
            catch(ex){
                // get sample data - static from sources.js - due to internet connection issues
                const newsArticles = getArticles(selected_source);
                console.log(newsArticles)
                // this.setState({newsArticles: newsArticles});

                this.setNewsArticles(newsArticles)
                console.log( ex + ": Can't connect to the api end point") 
                // if there are errors update the state
                this.setError(ex + ":Can't connect to the api end point");
            }

        }

            return(
                <div className="container-fluid">
                    <Header  
                        newsSourceSelectionChanged ={this.handleNewsSourceSelectionChanged} 
                        sources ={this.newsSources} 
                        selectedSource ={this.selectedSource}
                    />
                    <Main
                    articles ={this.newsArticles}
                    />
                    <Footer />
                </div>
            )
}

export default App
