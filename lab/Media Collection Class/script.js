// Part 1: JSON data
const gamesJSON = `[
    {
      "title": "The Legend of Zelda",
      "developer": "Nintendo",
      "price": 59.99,
      "image": "images/game1.jpg"
    },
    {
      "title": "God of War",
      "developer": "Santa Monica Studio",
      "price": 49.99,
      "image": "images/game2.jpg"
    },
    {
      "title": "Hollow Knight",
      "developer": "Team Cherry",
      "price": 14.99,
      "image": "images/game3.jpg"
    }
  ]`;
  
  // Part 2: Class Definition
  class VideoGame {
    #title; // Private attribute
  
    constructor(title, developer, price, image) {
      this.#title = title;
      this.developer = developer;
      this._price = price > 0 ? price : 0;
      this.image = image;
    }
  
    get title() {
      return this.#title;
    }
  
    set title(value) {
      if (value.length > 1) {
        this.#title = value;
      }
    }
  
    get price() {
      return this._price;
    }
  
    set price(value) {
      if (value > 0) {
        this._price = value;
      }
    }
  
    toString() {
      return `${this.#title} by ${this.developer} - $${this._price}`;
    }
  
    render() {
      const card = document.createElement("div");
      card.className = "game-card";
  
      card.innerHTML = `
        <img src="${this.image}" alt="${this.#title}">
        <h3>${this.#title}</h3>
        <p>Developer: ${this.developer}</p>
        <p>Price: $${this._price.toFixed(2)}</p>
      `;
  
      return card;
    }
  }
  
  // Part 3: Parse JSON and Display
  document.addEventListener("DOMContentLoaded", () => {
    const gameData = JSON.parse(gamesJSON);
    const container = document.getElementById("media-container");
  
    gameData.forEach(item => {
      const game = new VideoGame(item.title, item.developer, item.price, item.image);
      container.appendChild(game.render());
    });
  });
  