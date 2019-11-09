import React, { Component } from 'react';



export default class App extends Component {
  state = {
    c: true,
    random: 0,
    visibility: false,
    guess: null,
    guessVisibility: false,
    match: 0
  }

  strCompare = (str1, str2) => {
    
    let array1 = str1.split("");
    let array2 = str2.split("");
    for(let i=0;i<array2.length;i++){
        for(let j=0;j<array1.length;j++){
            if(array2[i]===array1[j]){
                array1.splice(array1.indexOf(array2[i]),1)
                break;
                
                
            }
        }
    }
    console.log(array1);
    
    return 6-array1.length
  }

  handleClick = () => {
    this.setState({ random: Math.floor(Math.random() * 100000) + 100000, visibility: true });
    window.localStorage.setItem('number', this.state.random.toString());
    setTimeout(() => {this.setState({ c: false })
   }
   , 5000);
    
  };


  handleGuess = event => {
    event.preventDefault();
    const Input = this.refs.input.value;

    if(Input!==""){
      this.setState({ guess: Input, guessVisibility: true });
      let match = this.strCompare(this.state.random.toString(),Input)
      console.log(Input,this.state.random.toString(),match);
      
      this.setState({ match })
      console.log( window.localStorage.getItem('number'));
      this.refs.input.value = "";
    }
    else{
      alert("please enter the number")
    }
   
  };

  handleReplay = () => {
    this.setState({ c: true, guessVisibility: false,visibility: false })
  }

  render() {
    const Main =
      <div>
        <h1>Generate The Number</h1>
        {this.state.visibility ? <div> {this.state.random} </div> : ""}
        <button onClick={this.handleClick}>Click me</button>
        {this.state.visibility ? <h1>refreshes in 5 seconds </h1> : ""}
      </div>

    const Guess = <div>
      <h1>Guess The Number</h1>
      <form onSubmit={this.handleGuess}>
        <label>
          <input ref="input" type="text" name="name" />
        </label>
        <button >Guess</button>
      </form>
      <div>
        
        <button onClick={this.handleReplay}>Replay</button>
        <div>
        {this.state.guessVisibility ? "your guess is : " + this.state.guess + "  Answer is : " +
          this.state.random + "Number of digits Matched :" + this.state.match : ""}
        </div>
      </div>
    </div>


    return (
      <div>
        {this.state.c ? Main : Guess}
      </div>
    )
  }
}

