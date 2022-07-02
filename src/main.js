'use strict'
import SimpleEngine from "./simple-2d-engine"
import Square from "./Entities/square"
import MyCircle from "./my-circle";
import Input from "./input-manger";

const game = new SimpleEngine();

game.entities.push(new Square(100, 100, 50, 50, 'red'))
game.entities.push(new MyCircle(300, 100, 50, 'blue'))