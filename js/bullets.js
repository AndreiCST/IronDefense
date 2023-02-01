class Bullets {

    constructor(ctx, fraction, bulletPosX, bulletPosY, towerDir, bulletType) {
        // Valores traidos de App
        this.ctx = ctx
        this.fraction = fraction

        this.bulletW = 10
        this.bulletH = 10
        this.bulletPosX = bulletPosX - this.bulletW / 2
        this.bulletPosY = bulletPosY - this.bulletH / 2

        this.towerDir = towerDir
        this.bulletType = bulletType

        this.image = new Image()

        // Types of Bullets
        if (this.bulletType === 'bullet1') {
            this.bulletDmg = 30
            this.bulletVel = 1.8
        }
        if (this.bulletType === 'bullet2') {
            this.bulletDmg = 90
            this.bulletVel = 8
        }
        if (this.bulletType === 'bullet3') {
            this.bulletDmg = 60
            this.bulletVel = 1
        }
    }

    drawB() {
        if (this.bulletType === 'bullet1') {
            this.image.src = './assets/mouse.jpeg'
            this.ctx.drawImage(this.image, this.bulletPosX, this.bulletPosY, this.bulletW, this.bulletH)
        }
        if (this.bulletType === 'bullet2') {
            this.image.src = './assets/mouse.jpeg'
            this.ctx.drawImage(this.image, this.bulletPosX, this.bulletPosY, this.bulletW, this.bulletH)
        }
        if (this.bulletType === 'bullet3') {
            this.image.src = './assets/mouse.jpeg'
            this.ctx.drawImage(this.image, this.bulletPosX, this.bulletPosY, this.bulletW, this.bulletH)
        }
        this.move()
    }

    move() {
        if (this.towerDir === 'shootDown' && this.bulletPosY < this.fraction * 10) {
            this.bulletPosY += this.bulletVel
        }
        if (this.towerDir === 'shootUp' && this.bulletPosY > this.fraction * 6) {
            this.bulletPosY -= this.bulletVel
        }
    }
}