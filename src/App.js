import React,{ Component } from 'react';
import Header from './components/header';
import Footer from './components/footer';
import Main from './components/main';
import './App.css';
import { getSources }  from './sources';
import { getArticles }  from './articles';
import Articles from './components/articles';
import axios from 'axios';

class App extends Component{

    state = {
        newsSources: [],
        errors: [],
        selectedSource: { },
        newsArticles:[]
    }

    componentDidMount(){
        const url = 'https://newsapi.org/v2/top-headlines?language=en&apiKey=c493e95394d444458f3488052428deab' 
        //connect to the api here
        try{
            const promise = axios.get(url)
            const promiseData = promise.response
            console.log(promiseData)
            // const sources = newsSources.sources;
            // console.log(sources)
            // this.setState({ newsSources:sources });
        }
        catch(error){
            console.log(error);
            const newsSources = getSources();
            this.setState({newsSources});
        }

       const  handleNewsSourceSelectionChanged =(selected_source)=>{
           console.log(selected_source)
            //change the source and update state 
            const sources  = [...this.state.newsSources];
            const userSelectedSource = sources.find(source =>source.id === selected_source.trim());
            this.setState({selectedSource: userSelectedSource})

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
                this.setState({newsArticles: articles});
            }
            catch(ex){
                // get sample data - static from sources.js - due to internet connection issues
                const newsArticles = getArticles(selected_source);
                console.log(newsArticles)
                this.setState({newsArticles: newsArticles});
                console.log( ex + ": Can't connect to the api end point") 
                // if there are errors update the state
                this.setState({errors: ex + "Can't connect to the api end point"});
            }

        }}

        render(){
            return(
                <React.Fragment>
                <div className="container-fluid">
                <Header  
                newsSourceSelectionChanged ={this.handleNewsSourceSelectionChanged} 
                sources ={this.state.newsSources} 
                selectedSource ={this.state.selectedSource}
                />
                <Main  articles ={this.state.newsArticles}/>
                <Footer />
                </div>
                </React.Fragment>
            )
        }
    }
    export default App;

// function App() {
  // return (
    // <div className="App">
    // </div>
  // );
// }
// export default App;
