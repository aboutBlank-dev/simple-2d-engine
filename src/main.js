'use strict'
import SimpleEngine from "./simple-2d-engine"
import Square from "./Entities/square"
import MyCircle from "./my-circle";
import Input from "./input-manger";
import Trapezium from "./Entities/trapezium";

const game = new SimpleEngine();

game.entities.push(new Square(100, 100, 50, 50, 'red'))
game.entities.push(new MyCircle(0, 0, 50, 'blue'))
game.entities.push(new Trapezium(100, 200, 'green'))

setTimeout(() => game.entities[0].setPosition(0, 0), 100)