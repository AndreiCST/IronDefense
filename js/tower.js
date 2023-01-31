class Tower {

    constructor(ctx, fraction, towerType, clickPosX, clickPosY, towerDir) {
        // Valores traidos de App
        this.ctx = ctx
        this.fraction = fraction

        this.bullets = []

        this.towerType = towerType
        this.towerDir = towerDir

        // Valores definidos en cada funcion de cada torre
        this.towerSizeW = 64
        this.towerSizeH = 64
        this.towerPosX = clickPosX - this.towerSizeW / 2
        this.towerPosY = clickPosY - this.towerSizeH / 2
        this.bulletPosX = clickPosX
        this.bulletPosY = clickPosY

        // Types of Bullets
        if (towerType === 'tower1') {
            this.bulletType = 'bullet1'
            // normal damage, fast rate
            // this.towerDmg = 40
            this.shootRate = 1000
            // this.towerCost = undefined
        }

        if (this.towerType === 'tower2') {
            this.bulletType = 'bullet2'
            // normal damage, fast rate
            // this.towerDmg = 40
            this.shootRate = 1000
            // this.towerCost = undefined
        }

        if (this.towerType === 'tower3') {
            this.bulletType = 'bullet3'
            // normal damage, fast rate
            // this.towerDmg = 40
            this.shootRate = 1000
            // this.towerCost = undefined
        }
        this.shootB()
    }

    drawT() {
        // Types of Towers
        if (this.towerType === 'tower1') {
            this.ctx.fillStyle = 'orange'
            this.ctx.fillRect(this.towerPosX, this.towerPosY, this.towerSizeW, this.towerSizeH)
        }
        if (this.towerType === 'tower2') {
            this.ctx.fillStyle = 'yellow'
            this.ctx.fillRect(this.towerPosX, this.towerPosY, this.towerSizeW, this.towerSizeH)
        }
        if (this.towerType === 'tower3') {
            this.ctx.fillStyle = 'pink'
            this.ctx.fillRect(this.towerPosX, this.towerPosY, this.towerSizeW, this.towerSizeH)
        }
        this.bullets.forEach(elm => elm.drawB())
    }

    shootB() {
        setInterval(() => {
            this.bullets.push(new Bullets(this.ctx, this.fraction, this.bulletPosX, this.bulletPosY, this.towerDir, this.bulletType))
        }, this.shootRate)
    }

    endBullet() {
        // this.bullets.forEach(elm => {
        if (this.bulletPosY >= this.fraction * 10) {
            console.log('llego!')
        }
        // })
    }
}