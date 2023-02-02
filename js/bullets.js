class Bullets {
    constructor(ctx, fraction, bulletPosX, bulletPosY, towerDir, bulletType) {
        // Valores traidos de App
        this.ctx = ctx
        this.fraction = fraction

        this.bulletW = this.fraction / 2
        this.bulletH = this.fraction / 2
        this.bulletPosX = bulletPosX - this.bulletW / 2
        this.bulletPosY = bulletPosY - this.bulletH / 2

        this.towerDir = towerDir
        this.bulletType = bulletType

        this.image = new Image()

        // Types of Bullets
        if (this.bulletType === 'bullet1') {
            this.bulletDmg = 10
            this.bulletVel = 1.8
        }
        if (this.bulletType === 'bullet2') {
            this.bulletDmg = 80
            this.bulletVel = 8
        }
        if (this.bulletType === 'bullet3') {
            this.bulletDmg = 60
            this.bulletVel = 1
        }
    }

    drawB() {
        if (this.bulletType === 'bullet1') {
            if (this.towerDir === 'shootUp') {
                this.image.src = './assets/Bullet1-Up.png'
                this.ctx.drawImage(this.image, this.bulletPosX, this.bulletPosY, this.bulletW, this.bulletH)
            }
            if (this.towerDir === 'shootDown') {
                this.image.src = './assets/Bullet1-Down.png'
                this.ctx.drawImage(this.image, this.bulletPosX, this.bulletPosY, this.bulletW, this.bulletH)
            }
        }
        if (this.bulletType === 'bullet2') {
            if (this.towerDir === 'shootUp') {
                this.image.src = './assets/Bullet2-Up.png'
                this.ctx.drawImage(this.image, this.bulletPosX, this.bulletPosY, this.bulletW, this.bulletH)
            }
            if (this.towerDir === 'shootDown') {
                this.image.src = './assets/Bullet2-Down.png'
                this.ctx.drawImage(this.image, this.bulletPosX, this.bulletPosY, this.bulletW, this.bulletH)
            }
        }
        if (this.bulletType === 'bullet3') {
            if (this.towerDir === 'shootUp') {
                this.image.src = './assets/Bullet3-Up.png'
                this.ctx.drawImage(this.image, this.bulletPosX, this.bulletPosY, this.bulletW, this.bulletH)
            }
            if (this.towerDir === 'shootDown') {
                this.image.src = './assets/Bullet3-Down.png'
                this.ctx.drawImage(this.image, this.bulletPosX, this.bulletPosY, this.bulletW, this.bulletH)
            }
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