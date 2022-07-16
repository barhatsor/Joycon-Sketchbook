
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
  
  if (!inAirplane) {
    
    if (value == 1) Client.pressKey('ShiftLeft');
    else Client.releaseKey('ShiftLeft');
  
  }

});

controllers.on.press('x', (value) => {

  if (value == 1) Client.pressKey('KeyF');
  else Client.releaseKey('KeyF');

});


controllers.on.press('left-trigger', (value) => {

  if (freeCameraMode) {
    
    if (value > 0.3) Client.pressKey('KeyQ');
    else Client.releaseKey('KeyQ');
  
  } else if (inAirplane || inHelicopter) {

    if (value > 0.3) Client.pressKey('Space');
    else Client.releaseKey('Space');
    
  } else if (inCar) {
    
    if (value > 0.3) Client.pressKey('KeyS');
    else Client.releaseKey('KeyS');
    
  }

});

controllers.on.press('right-trigger', (value) => {
  
  if (freeCameraMode) {
    
    if (value > 0.3) Client.pressKey('KeyE');
    else Client.releaseKey('KeyE');
  
  } else if (inAirplane || inHelicopter) {
    
    if (value > 0.3) Client.pressKey('ShiftLeft');
    else Client.releaseKey('ShiftLeft');
  
  } else if (inCar) {
    
    if (value > 0.3) Client.pressKey('KeyW');
    else Client.releaseKey('KeyW');
    
  }

});

controllers.on.press('left-shoulder', (value) => {
  
  if (inAirplane) {
    
    if (value == 1) Client.pressKey('KeyA');
    else Client.releaseKey('KeyA');
  
  } else if (inHelicopter) {
    
    if (value == 1) Client.pressKey('KeyQ');
    else Client.releaseKey('KeyQ');
    
  }

});

controllers.on.press('right-shoulder', (value) => {
  
  if (inAirplane) {
    
    if (value == 1) Client.pressKey('KeyD');
    else Client.releaseKey('KeyD');
  
  } else if (inHelicopter) {
    
    if (value == 1) Client.pressKey('KeyE');
    else Client.releaseKey('KeyE');
    
  }

});


controllers.on.press('dpad-right', (value) => {
  
  if (value == 1) Client.pressKey('KeyV');
  else Client.releaseKey('KeyV');

});

controllers.on.press('dpad-up', (value) => {
  
  if (value == 1) Client.pressKey('KeyX');
  else Client.releaseKey('KeyX');

});


const hornSFX = document.querySelector('.horn-sfx');

controllers.on.press('dpad-down', (value) => {
  
  if (value == 1) {
    
    hornSFX.currentTime = 0;
    hornSFX.play();
    
  }

});


let freeCameraMode = false;

controllers.on.press('dpad-left', (value) => {
  
  if (value == 1) {
    
    Client.pressKey('KeyC', true);
    
    freeCameraMode = !freeCameraMode;
    
  } else {
    
    Client.releaseKey('KeyC', true);
        
  }

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


let inAirplane = false;
let inHelicopter = false;
let inCar = false;

function gameLoop() {
  
  if (world.characters[0]
      && world.characters[0].controlledObject
      && world.characters[0].controlledObject.leftAileron) {
    
    inAirplane = true;
    
  } else {
    
    inAirplane = false;
    
  }
  
  if (world.characters[0]
      && world.characters[0].controlledObject
      && world.characters[0].controlledObject.rotors) {
    
    inHelicopter = true;
    
  } else {
    
    inHelicopter = false;
    
  }
  
  if (world.characters[0]
      && world.characters[0].controlledObject
      && world.characters[0].controlledObject.steeringWheel) {
    
    inCar = true;
    
  } else {
    
    inCar = false;
    
  }
  
  
  
  Client.moveMouse(rightJoystick.x * 20, rightJoystick.y * 20);
  
  
  if (!inAirplane) {
    
    if (leftJoystick.x > 0.3) {
  
      Client.pressKey('KeyD');
      Client.releaseKey('KeyA');
  
    } else if (leftJoystick.x < -0.3) {
  
      Client.pressKey('KeyA');
      Client.releaseKey('KeyD');
  
    } else {
  
      Client.releaseKey('KeyD');
      Client.releaseKey('KeyA');
  
    }
    
  } else {
    
    if (leftJoystick.x > 0.3) {
  
      Client.pressKey('KeyE');
      Client.releaseKey('KeyQ');
  
    } else if (leftJoystick.x < -0.3) {
  
      Client.pressKey('KeyQ');
      Client.releaseKey('KeyE');
  
    } else {
  
      Client.releaseKey('KeyQ');
      Client.releaseKey('KeyE');
  
    }
    
  }
  
  
  if (!inCar) {
    
    if (leftJoystick.y > 0.3) {
  
      Client.pressKey('KeyS');
      Client.releaseKey('KeyW');
  
    } else if (leftJoystick.y < -0.3) {
  
      Client.pressKey('KeyW');
      Client.releaseKey('KeyS');
  
    } else {
  
      Client.releaseKey('KeyS');
      Client.releaseKey('KeyW');
  
    }
    
  }
  
  
  if (controllerConnected) {
    window.requestAnimationFrame(gameLoop);
  }
  
}


