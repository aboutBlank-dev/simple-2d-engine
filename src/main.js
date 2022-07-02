'use strict'
import SimpleEngine from "./simple-2d-engine"
import Square from "./Entities/square"
import Circle from "./Entities/circle";

const game = new SimpleEngine();

game.entities.push(new Square(100, 100, 50, 50, 'red'))
game.entities.push(new Circle(300, 100, 50, 'blue'))
