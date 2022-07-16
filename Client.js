
let Client = {
  
  // keys are: KeyA, KeyW, KeyD, KeyS, Space, ShiftLeft
  'pressKey': (keyName, shiftKey) => {
    
    const keyEvent = new KeyboardEvent('keydown', {
      'code': keyName,
      'shiftKey': shiftKey ? true : false
    });

    document.dispatchEvent(keyEvent);
    
  },
  
  'releaseKey': (keyName) => {
    
    const keyEvent = new KeyboardEvent('keyup', {
      'code': keyName
    });

    document.dispatchEvent(keyEvent);
    
  },
  
  'moveMouse': (deltaX, deltaY) => {

    let tempEvent = new MouseEvent('mousedown');
    document.querySelector('#canvas').dispatchEvent(tempEvent);
    
    const mouseEvent = new MouseEvent('mousemove', {
        'movementX': deltaX,
        'movementY': deltaY
    });
  
    document.querySelector('#canvas').dispatchEvent(mouseEvent);
    
    tempEvent = new MouseEvent('mouseup');
    document.querySelector('#canvas').dispatchEvent(tempEvent);
    
  }
  
};

