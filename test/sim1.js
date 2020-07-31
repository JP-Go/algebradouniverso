let L = 250;
  let angle = 0;
  let angle_0 = 60 ;
  let mass = 10; 
  let g  = 9.81;
  let omega = Math.sqrt(g/L);
  let time = 0
  
  let Inputs = {}

  function setup() {
    let isLooping = false
    createCanvas(600, 400);
    noLoop()
    let strBtn = createElement('button', 'Start')
    let NextFrameBtn = createElement('button','NextFrame')
    
    InputHandler()
    
    strBtn.mouseClicked(() => {
      if (isLooping) {
        noLoop()
        isLooping = !isLooping
        strBtn.html('Continue')
      } else {
        loop()
        isLooping = !isLooping
        strBtn.html('Stop')
      }
    })
    
      NextFrameBtn.mouseClicked(() => {
      if (!isLooping) {
        redraw()
      }
    })
  console.log(`Período ${2*PI*sqrt(L/g)} s`)
  }

  function draw() {
    angleMode(DEGREES)
    
    L = Inputs.L.value()
    angle_0 = Inputs['theta-0'].value()
    g = Inputs.g.value()
    mass = Inputs.mass.value()
    angle = angle_0 * cos(omega*time)
    
    omega = sqrt(g/L)
    background(220);
    let base = createVector(width/2, 100)
    let p = createVector(base.x + L * sin(angle),
      base.y + L * cos(angle)
    );
    circle(p.x, p.y, mass);
    fill(200, 50, 50);
    line(base.x, base.y, p.x, p.y);
    line(0,base.y,width,base.y)
    
    time += deltaTime
  }

  function InputHandler(){
    let div = createDiv()    
    div.style('display','grid')
    div.style('grid-template-columns', '1fr 1fr')
    
    let putInCol = (arr,startRow,endRow) => {
      if(typeof arr == 'object'){
      arr.forEach(element =>{
        element.style('grid-column',`${startRow} / ${endRow}`).parent(div)
      })
      }

    }
    let title = createElement('h3','Inputs')
    let compTxt = createElement('span','Corda (cm)')
    let angTxt = createElement('span','\u03B8 (&deg)')
    let gTxt = createElement('span','g (m/s\u00B2)')
    let massTxt = createElement('span','Massa (g)')
    
    let compIn = Inputs.L =createInput(L.toString(),'number')
    let angIn = Inputs['theta-0'] = createInput(angle_0.toString(),'number')
    let gIn = Inputs.g =createInput(g.toString(),'number')
    let massIn = Inputs.mass = createInput(mass.toString(),'number')
    
    putInCol([title,compTxt,compIn,angTxt,angIn],1,'span 1')
    putInCol([gTxt,gIn,massTxt,massIn],1,'span 1')
  }
