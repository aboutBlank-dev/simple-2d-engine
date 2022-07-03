'use strict'
import SimpleEngine from "./simple-2d-engine"
import Square from "./Entities/square"
import MySquare from "./my-square";
import Input from "./input-manger";
import Trapezium from "./Entities/trapezium";
import Circle from "./Entities/circle";

const game = new SimpleEngine();

game.entities.push(new Square(200, 70, 50, 50, 'red'))
game.entities.push(new Square(300, 70, 50, 50, 'red'))
game.entities.push(new Square(400, 70, 50, 50, 'red'))
game.entities.push(new Square(500, 70, 50, 50, 'red'))
game.entities.push(new Square(600, 70, 50, 50, 'red'))
game.entities.push(new Circle(200, 200, 50, 'blue'))
game.entities.push(new MySquare(0, 0, 50, 'blue'))



