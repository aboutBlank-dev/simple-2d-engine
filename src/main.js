'use strict'
import SimpleEngine from "./simple-2d-engine"
import Square from "./Entities/square"
import MySquare from "./my-square";
import Input from "./input-manger";
import Trapezium from "./Entities/trapezium";
import Circle from "./Entities/circle";

const game = new SimpleEngine();

game.entities.push(new Square(70, 200, 50, 50, 'red'))
game.entities.push(new MySquare(0, 0, 50, 'blue'))
//game.entities.push(new Trapezium(150, 200, 'green'))
game.entities.push(new Circle(300, 100, 50, 'pink'))
