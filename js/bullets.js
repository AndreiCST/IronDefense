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
        this.image.src = './assets/mouse.jpeg'
    }

    drawB() {
        if (this.bulletType === 'bullet1') {
            // this.ctx.fillStyle = 'orange'
            // this.ctx.fillRect(this.bulletPosX, this.bulletPosY, this.bulletW, this.bulletH)

            this.ctx.drawImage(this.image, this.bulletPosX, this.bulletPosY, this.bulletW, this.bulletH)
        }
        if (this.bulletType === 'bullet2') {
            this.ctx.fillStyle = 'yellow'
            this.ctx.fillRect(this.bulletPosX, this.bulletPosY, this.bulletW, this.bulletH)
        }
        if (this.bulletType === 'bullet3') {
            this.ctx.fillStyle = 'pink'
            this.ctx.fillRect(this.bulletPosX, this.bulletPosY, this.bulletW, this.bulletH)
        }
        this.move()
    }

    move() {
        if (this.towerDir === 'shootDown' && this.bulletPosY < this.fraction * 10) {
            this.bulletPosY++
        }
        if (this.towerDir === 'shootUp' && this.bulletPosY > this.fraction * 6) {
            this.bulletPosY--
        }
    }
}