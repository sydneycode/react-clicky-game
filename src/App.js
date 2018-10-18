import React, { Component } from "react";
import ImageCard from "./components/ImageCard";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import images from "./images.json";
import "./App.css";

class App extends Component {
  state = {
    images,
    score: 0,
    topScore: 0,
    message: "Click an image to begin! "
  };

  componentDidMount = () => {
    this.shuffleImages();
  }

  setClicked = id => {
    this.state.images.forEach(image => {
      if (image.id === id) {
        if (!image.clicked) {
          image.clicked = true;
          if (this.state.score + 1 > this.state.topScore) {
            this.setState({
              topScore: this.state.score + 1
            })
          }
          this.setState({
            score: this.state.score + 1,
            message: "You guessed correctly! "
          });
        }
        else {
          this.setState({
            score: 0,
            message: "You guessed incorrectly! "
          });
          this.restartGame();
        }
      }
    });
    this.shuffleImages();
  }

  restartGame = () => {
    this.state.images.forEach(image => {
      image.clicked = false;
    });
  }

  shuffleImages = () => {
    const len = this.state.images.length;
    const order = [];
    for (let i = 0; i < len; i++) {
      order.push(i);
    }
    let n = len;
    const shuffledImages = [];
    for (let i = 0; i < len; i++) {
      const randomNum = Math.floor(Math.random() * n);
      shuffledImages.push(images[order[randomNum]]);
      order.splice(randomNum, 1);
      n--;
    }
    this.setState({
      images: shuffledImages
    })
  }

  // Map over this.state.images and render an ImageCard component for each image object
  render() {
    return (
      <Wrapper>
        <Title>Clicky Game! {this.state.message} 
          Score: {this.state.score} | Top Score: {this.state.topScore}</Title>
          {this.state.images.map(image => (
            <ImageCard
              setClicked={this.setClicked}
              id={image.id}
              name={image.name}
              url={image.url}
            />
          ))}
      </Wrapper>
    );
  }
}

export default App;
