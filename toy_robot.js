const toyRobot = {
  onTable: false,
  facing: {
    x: 1,
    y: 0
  },
  position: {
    x: 0,
    y: 0
  },
  setFacing(x, y) {
    this.facing.x = x
    this.facing.y = y
  }, 
  setPosition(x, y) {
    if (x <= 4 && x >= 0) this.position.x = x
    if (y <= 4 && y >= 0) this.position.y = y
  }
}

export default toyRobot