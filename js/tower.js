class Tower {

    constructor(ctx, fraction, framesCounter, towerType, towerPosX, towerPosY) {
        // Valores traidos de App
        this.ctx = ctx
        this.fraction = fraction
        this.framesCounter = framesCounter
        this.bullets = []

        // Types of Towers
        if (towerType === 'tower1') {
            // normal damage, fast rate
            // this.towerDmg = 40
            // this.shotRate = undefined
            // this.towerCost = undefined
            // this.bulletType = normal
        }

        if (towerType === 'tower2') {
            // high damage, slow rate
            // this.towerDmg = 90
            // this.shotRate = undefined
            // this.towerCost = undefined
            // this.bulletType = sniper
        }

        if (towerType === 'tower3') {
            // high damage, normal rate
            // this.towerDmg = 80
            // this.shotRate = undefined
            // this.towerCost = undefined
            // this.bulletType = heavy
        }

        // Valores definidos en cada funcion de cada torre
        this.towerPosX = towerPosX
        this.towerPosY = towerPosY
        this.towerSizeW = undefined
        this.towerSizeH = undefined
    }

    draw() {
        // TEMPORAL
        this.ctx.fillStyle = '#FFB300' // Naranja - Torre 1 en Map
        this.ctx.fillRect(this.towerPosX, this.towerPosY, 64, 64)
    }


    generateBullets() {
        this.bullets.push(new Bullets(ctx, canvasSize))
    }
}