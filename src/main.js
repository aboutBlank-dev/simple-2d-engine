'use strict'
import SimpleEngine from "./simple-2d-engine"
import Square from "./square"

const game = new SimpleEngine();

game.entities.push(new Square(100, 100, 50, 50, 'red'))
game.entities.push(new Square(200, 200, 50, 50, 'blue'))