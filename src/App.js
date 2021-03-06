import React from 'react';
import './App.css';
import './Music.js' ;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      films: {}, //films is a hash, or object because we're attaching multiple pieces of info per unique url
      people: [], //people can still be an array here
     turnon: false,
     currentFilm:{},
     currentChar: {},
     music: false
      }
      this.changeTurns = this.changeTurns.bind(this);
    this.displayFilm = this.displayFilm.bind(this); //need to use bind statement here because we're setting state within the displayFilm function
  this.audio = new Audio("totoro.mp3");
  }
  componentDidMount() { //this function runs once on load -> contains our displayFilm function, which calls both load/fetch functions
    this.displayFilm();
    //this.audio.play();
  }

  async loadFilms() { //async is used here to allow us to tell it to wait until the fetch is done
    const res = await fetch("https://ghibliapi.herokuapp.com/films");
      const films = await res.json() //we make films a variable here that waits for the fetch response
      return films} //returns the json

    async loadPeople(){ //same comments as loadFilms function
    const res = await fetch("https://ghibliapi.herokuapp.com/people");
        const people = await res.json()
        return people  }



async displayFilm(){ //using 'async' before the function lets you use await keyword (and thus, allows it to NOT be async when stated)
  let api_movies = await this.loadFilms(); //setting up new variablename and calling the loadFilm function after it's run all elements
  let api_people = await this.loadPeople(); //same as line 30
  const movies = {}; //declaring variable movies as an object that's going to contain elements of both Films and People
  for (var i=0; i < api_movies.length; i++){
    movies[api_movies[i].url] = api_movies[i]; //make the .url portion of the loadFilms function the key of the movies hash
    movies[api_movies[i].url].characters = []; //within elements that have the same key, .characters is an array that will pull from the loadPeople function
  }
  for (var j = 0; j< api_people.length; j++){
    movies[api_people[j].films[0]].characters.push(api_people[j].name); // we call films[0] here because the people.films array contains only one thing
  }                                                                     //we're pushing the name of each character within the people field that matches the movies url
this.setState({
  films: movies //sets the 'films' state to be the object movies (line 32), overriding the initial states in the Constructor
})
}

playMusic(){ //turns music on or off when called in the OnClick event (in image)
  if(this.state.music===true){
  this.audio.play()}
  else{
    this.audio.pause()
  }
  this.setState({
    music: !this.state.music
  }

  )
}

showStuff(whichfilm){ //checks if the film id matches the current id within the container div
const film = this.state.currentFilm;  
const character = this.state.currentChar;
if(film.id ===whichfilm.id){
  
    return <h4>{film.description}
    {character}</h4>;}

else {
  return <h2></h2> //this is blank because it returns nothing if it doesn't match
}
}

changeTurns(film, character){ //sets the 'turnon' variable state in the onClick within the container div
  this.setState({turnon: !this.state.turnon, currentFilm: film, currentChar: character
  })
}

  render() {
    let films = [];
    console.log(this.state.films); //lets us see what's in the film state, for troubleshooting
    /*        for (let i = 0; i < this.state.films.length; i++) {
      films.push(<div className="container">{this.state.films[i].title}<p></p>
      <img src={this.state.films[i].image}></img></div>

           ) }   This is an old for loop that pushed to the display array prior to our new displayFilm function*/ 
    var counter = 0;      
    Object.values(this.state.films).forEach(film => { //Object is a helper class in JS -> lets you use objects as arrays: keys, values, combined value&key
      const characters = [];                          //this lets us loop over each item in our films (l 46) to assemble character info by film
      for (var i =0; i < film.characters.length; i++){ //loop to put each character inside of the characters display array (l 55)
        characters.push(<h4>{film.characters[i]} </h4>)
      }
      films.push(<div id={counter} className="container" onClick={()=>this.changeTurns(film, characters)}><h1>{film.title}</h1><br></br>
      {film.release_date}<br></br>
      <p></p> {/* <!---pushes title, image, then entire characters display array for each item in films (l 46)---> */}
     <img src={film.image} onClick={()=> this.playMusic()}></img> {this.showStuff(film)}<br></br>
        
      </div>)
      console.log(counter);
      counter = counter +1;
      
    });
    
            
                        
    /* for (let j = 0; j < this.state.people.length; j++) {
    if(this.state.people[j].films[0]===this.state.films[i].url){
      films.push(<div className="people">{this.state.people[j].name}</div>)
    }     
      }  This is the old loop for checking people against films
    } */

    return (
      <div className="App">
        <div className="header" onClick={this.changeTurns}><h1>Studio Ghibli Films</h1>
       </div>
        {films}
        
      </div>
    );
    }
}

export default App;
