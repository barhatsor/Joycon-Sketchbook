
/* Joycon integration for Sketchbook */

const controllers = Joycon.controllers;


let controllerConnected = false;

controllers.on.connect(() => {
  
  controllerConnected = true;
  gameLoop();
  
});

controllers.on.disconnect(() => {
  
  controllerConnected = false;
  
});


controllers.on.press('a', (value) => {

  if (value == 1) Client.pressKey('Space');
  else Client.releaseKey('Space');

});

controllers.on.press('left-joystick', (value) => {

  if (value == 1) Client.pressKey('ShiftLeft');
  else Client.releaseKey('ShiftLeft');

});

controllers.on.press('x', (value) => {

  if (value == 1) Client.pressKey('KeyF');
  else Client.releaseKey('KeyF');

});


let leftJoystick = {
  x: 0,
  y: 0
};

let rightJoystick = {
  x: 0,
  y: 0
};

controllers.on.move('left-joystick', (value) => {

  leftJoystick = value;
  
});

controllers.on.move('right-joystick', (value) => {

  rightJoystick = value;
  
});


function gameLoop() {
  
  Client.moveMouse(rightJoystick.x * 10, rightJoystick.y * 10);
  
  if (leftJoystick.x > 0.3) {
    
    Client.pressKey('KeyD');
    
  } else if (leftJoystick.x < 0.3) {
    
    Client.pressKey('KeyA');
    
  } else {
    
    Client.releaseKey('KeyD');
    Client.releaseKey('KeyA');
    
  }
  
  if (leftJoystick.y > 0.3) {
    
    Client.pressKey('KeyS');
        
  } else if (leftJoystick.y < 0.3) {
    
    Client.pressKey('KeyW');
    
  } else {
    
    Client.releaseKey('KeyS');
    Client.releaseKey('KeyW');
    
  }
  
  if (controllerConnected) {
    window.requestAnimationFrame(gameLoop);
  }
  
}


