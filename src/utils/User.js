class User {
  generateRgb =
    () => Math.floor(Math.random() * (256 + 1));

  generateColor =
     () => `(${this.generateRgb()}, ${this.generateRgb()}, ${this.generateRgb()})`;
  
  generateUniqueId = 
    () => Math.random().toString(36).substr(2, 6);

  generateName = 
    () => `user_${this.generateUniqueId()}`;

  getUser = () => {
    return {
      name: this.generateName(),
      color: this.generateColor()
    }
  }
  
}

export default new User();