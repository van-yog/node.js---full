const EventEmitter = require("events");

class MyEmitter extends EventEmitter {
  constructor() {
    super();

    this.greeting = "Hello";

  }

  greet(name) {
    this.emit("greet", `${this.greeting} ${name}`);
  }
}

const myCustomEmitter = new MyEmitter();

myCustomEmitter.on("greet", (message) => {
  console.log(message);
})

myCustomEmitter.greet("John Sina");