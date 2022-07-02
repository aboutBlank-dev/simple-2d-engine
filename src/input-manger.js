export default class Input {
  static get horizontal () {
    let value = 0;
    if(Input.left) value -= 1
    if(Input.right) value += 1
    return value
  }
  
  static get vertical () {
    let value = 0;
    if(Input.up) value += 1
    if(Input.down) value -= 1
    return value
  }

  static down = false;
  static up = false;
  static left = false;
  static right = false;
}

const keyHandler = (e, pressed) => {
  switch(e.key) {
    case 'ArrowLeft':
      Input.left = pressed;
      break;
    case 'ArrowRight':
      Input.right = pressed;
      break;
    case 'ArrowUp':
      Input.up = pressed;
      break;
    case 'ArrowDown':
      Input.down = pressed;
      break;
  }
}

window.addEventListener('keydown', (e) => keyHandler(e, true), false);
window.addEventListener('keyup', (e) => keyHandler(e, false), false);
