class Tower {
    constructor(ctx, towerDmg, shotRate, towerPos, towerSize, towerCost, bulletType) {
        this.ctx = ctx
        this.towerDmg = undefined
        this.shotRate = undefined
        this.towerPos = { x: undefined, y: undefined }
        this.towerSize = { w: undefined, h: undefined }
        this.towerCost = undefined
        this.bulletType = undefined
    }

    drawTower() {
        this.ctx.beginPath()
        this.ctx.arc(x, y, 0, Math.PI * 2)
        this.ctx.fill()
        this.ctx.stroke()
    }

    regularTower() {
        this.towerDmg = 30
        this.shotRate =
            this.towerPos = { x: undefined/* event listener donde se hace click */, y: undefined /* event listener donde se hace click */ }
        this.towerSize = { w: undefined, h: undefined }
        this.towerCost = undefined
        this.bulletType = undefined
    }

    // mediumTower() {
    // }

    // strongTower() {
    // }


}