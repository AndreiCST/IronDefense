class Tower {
    constructor(ctx, fraction, framesCounter, clickPosX, clickPosY, towerType, towerDir) {
        // Valores traidos de App
        this.ctx = ctx
        this.fraction = fraction

        this.towerSizeW = this.fraction * 2
        this.towerSizeH = this.fraction * 2
        this.towerPosX = clickPosX - this.towerSizeW / 2
        this.towerPosY = clickPosY - this.towerSizeH / 2
        this.bulletPosX = clickPosX
        this.bulletPosY = clickPosY

        this.timeOfCreation = framesCounter
        this.towerType = towerType
        this.towerDir = towerDir
        this.bullets = []

        this.image = new Image()

        // Types of towers
        if (towerType === 'tower1') {
            this.bulletType = 'bullet1'
            this.shootRate = 15
        }
        if (this.towerType === 'tower2') {
            this.bulletType = 'bullet2'
            this.shootRate = 40
        }
        if (this.towerType === 'tower3') {
            this.bulletType = 'bullet3'
            this.shootRate = 60
        }
    }

    drawT(framesCounter) {
        // Types of Towers
        this.bullets.forEach(elm => elm.drawB())
        this.shootB(framesCounter)
        if (this.towerType === 'tower1') {
            if (this.towerDir === 'shootDown') {
                this.image.src = './assets/TowerPack/tower1D.gif'
                this.ctx.drawImage(this.image, this.towerPosX, this.towerPosY, this.towerSizeW, this.towerSizeH)
            }
            if (this.towerDir === 'shootUp') {
                this.image.src = './assets/TowerPack/tower1.gif'
                this.ctx.drawImage(this.image, this.towerPosX, this.towerPosY, this.towerSizeW, this.towerSizeH)
            }
        }
        if (this.towerType === 'tower2') {
            if (this.towerDir === 'shootDown') {
                this.image.src = './assets/TowerPack/tower2D.gif'
                this.ctx.drawImage(this.image, this.towerPosX, this.towerPosY, this.towerSizeW, this.towerSizeH)
            }
            if (this.towerDir === 'shootUp') {
                this.image.src = './assets/TowerPack/tower2.gif'
                this.ctx.drawImage(this.image, this.towerPosX, this.towerPosY, this.towerSizeW, this.towerSizeH)
            }
        }
        if (this.towerType === 'tower3') {
            if (this.towerDir === 'shootDown') {
                this.image.src = './assets/TowerPack/tower3D.gif'
                this.ctx.drawImage(this.image, this.towerPosX, this.towerPosY, this.towerSizeW, this.towerSizeH)
            }
            if (this.towerDir === 'shootUp') {
                this.image.src = './assets/TowerPack/tower3.gif'
                this.ctx.drawImage(this.image, this.towerPosX, this.towerPosY, this.towerSizeW, this.towerSizeH)
            }
        }
        this.endBullet()
    }

    shootB(framesCounter) {
        if ((framesCounter + this.timeOfCreation) % this.shootRate === 0) {
            this.bullets.push(new Bullets(this.ctx, this.fraction, this.bulletPosX, this.bulletPosY, this.towerDir, this.bulletType))
        }
    }

    endBullet() {
        this.bullets.forEach(elm => {
            if (this.towerDir === 'shootDown') {
                this.bullets = this.bullets.filter(elm2 => elm2.bulletPosY <= this.fraction * 10 - elm.bulletH)
            }
            if (this.towerDir === 'shootUp') {
                this.bullets = this.bullets.filter(elm2 => elm2.bulletPosY >= this.fraction * 6)
            }
        })
    }
}