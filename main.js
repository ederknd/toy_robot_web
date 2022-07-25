
import './style.css'
import toyRobot from './toy_robot'

const commands = {
  'place'    : place,
  'pressKeyA': rotateLeft,
  'pressKeyD': rotateRight,
  'pressKeyW': move
}

function rotateLeft() {
  if (toyRobot.onTable === false) return

  toyRobot.setFacing(toyRobot.facing.y, -toyRobot.facing.x)
  handleInterfaceChange(toyRobot.position.x, toyRobot.position.y)
}

function rotateRight() {
  if (toyRobot.onTable === false) return

  toyRobot.setFacing(-toyRobot.facing.y, toyRobot.facing.x)
  handleInterfaceChange(toyRobot.position.x, toyRobot.position.y)
}

function place(x, y) {
  getFacingFromInput()
  toyRobot.setPosition(x, y)
  
  toyRobot.onTable = true
  handleInterfaceChange(toyRobot.position.x, toyRobot.position.y)
}

function move() {
  if (toyRobot.onTable === false) return

  const xPositionAfter = toyRobot.position.x + toyRobot.facing.x
  const yPositionAfter = toyRobot.position.y + toyRobot.facing.y

  toyRobot.setPosition(xPositionAfter, yPositionAfter)
  handleInterfaceChange(toyRobot.position.x, toyRobot.position.y)
}

function handleInterfaceChange(x, y) {
  let targetElement = document.querySelector(`[data-x='${x}'][data-y='${y}']`)

  if (!!targetElement) {
    let allArrows = document.querySelectorAll('.arrow')

    const arrow = document.createElement('i')
    if (toyRobot.facing.x === 0 && toyRobot.facing.y === 1) {
      arrow.setAttribute('class', 'arrow down')
    }
    
    if (toyRobot.facing.x === 0 && toyRobot.facing.y === -1) {
      arrow.setAttribute('class', 'arrow up')
    }
    
    if (toyRobot.facing.x === 1 && toyRobot.facing.y === 0) {
      arrow.setAttribute('class', 'arrow right')
    }
    
    if (toyRobot.facing.x === -1 && toyRobot.facing.y === 0) {
      arrow.setAttribute('class', 'arrow left')
    }

    allArrows.forEach((arrowToDelete) => { 
      if (arrowToDelete !== arrow) {
        arrowToDelete.remove() 
      }
    })

    targetElement.appendChild(arrow)
  }
}

document.addEventListener('keypress', (event) => {
  try {
    commands[`press${event.code}`]()
  } catch (error) {
    throw new Error('Invalid Command')
  }
})

document.addEventListener('click', (event) => {
  const x = event.target.dataset.x
  const y = event.target.dataset.y

  if (!x || !y) return

  commands['place'](parseInt(x), parseInt(y))
})

document.querySelector('#facingSelect').addEventListener('change', (event) => {
  getFacingFromInput()
})

function generateTable() {
  const tbl = document.createElement("table");
  const tblBody = document.createElement("tbody");

  for (let i = 0; i < 5; i++) {
    const row = document.createElement("tr");

    for (let j = 0; j < 5; j++) {
      const cell = document.createElement("td");
      cell.setAttribute('data-x', j);
      cell.setAttribute('data-y', i);

      row.appendChild(cell);
    }
    tblBody.appendChild(row);
  }


  tbl.appendChild(tblBody);

  document.querySelector('#app').appendChild(tbl);
  tbl.setAttribute("border", "1");
}

function getFacingFromInput() {
  let selectValues = document.querySelector('#facingSelect').value

  let [x, y] = selectValues.split(',').map((value) => { return parseInt(value) })
  
  toyRobot.setFacing(x, y)

  if (toyRobot.onTable) {
    handleInterfaceChange(toyRobot.position.x, toyRobot.position.y)
  }
}

generateTable()
getFacingFromInput()