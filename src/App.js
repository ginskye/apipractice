import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      films: [],
      people: []
    }
  }
  componentDidMount() {
    this.loadFilms();
    this.loadPeople();
  }

  loadFilms() {
    fetch("https://ghibliapi.herokuapp.com/films")
      .then(res =>
        res.json())
      .then(json_response =>
        this.setState({ films: json_response }));}

    loadPeople(){
    fetch("https://ghibliapi.herokuapp.com/people")
        .then(res =>
          res.json())
        .then(json_response =>
          this.setState({ people: json_response }));
  

  }
//write a function to compare the films and people array -> many people/film
//want to push people where people.films = films[i].url
// comparePeople(){
//   let people = [];
//   for (let j = 0; j < this.state.people.length; j++){
// where (this.state.people[j].films = films[i].url)}
// return {this.state.people[j].name}
// }

  render() {
    let films = [];
    
           for (let i = 0; i < this.state.films.length; i++) {
      films.push(<div className="container">{this.state.films[i].title}<p></p>
      <img src={this.state.films[i].image}></img></div>

      )
            
                        
    for (let j = 0; j < this.state.people.length; j++) {
    if(this.state.people[j].films[0]===this.state.films[i].url){
      films.push(<div className="people">{this.state.people[j].name}</div>)
    }     
      }
    }

    return (
      <div className="App">
        
        {films}
        
      </div>
    );
    }
}

export default App;
