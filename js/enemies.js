class Enemy {
    constructor(ctx, fraction, enemyType, healthUpgrade) {
        // Values from App
        this.ctx = ctx
        this.fraction = fraction
        this.enemyType = enemyType
        this.image = new Image()
        this.image.frames = 8
        this.image.framesIndex = 0
        this.newHealth = healthUpgrade

        // Types of Enemies
        if (enemyType === 'regular') {
            // normal health, normal speed
            this.enemySize = { w: 20, h: 20 }
            this.enemyHealth = 100 * this.newHealth
            this.enemyReward = 2
            this.enemySpeed = 3
            this.image.src = './assets/bandit-sprite.png'
        }
        if (enemyType === 'fast') {
            // low health, high speed
            this.enemySize = { w: 15, h: 15 }
            this.enemyHealth = 70 * this.newHealth
            this.enemyReward = 5
            this.enemySpeed = 4
            this.image.src = './assets/gnoll-sprite.png'
        }
        if (enemyType === 'strong') {
            // high health, low speed
            this.enemySize = { w: 30, h: 30 }
            this.enemyHealth = 150 * this.newHealth
            this.enemyReward = 10
            this.enemySpeed = 1.5
            this.image.src = './assets/knight-sprite.png'
        }
        if (enemyType === 'boss') {
            // high health, low speed
            this.enemySize = { w: 50, h: 50 }
            this.enemyHealth = 500 * this.newHealth
            this.enemyReward = 30
            this.enemySpeed = 0.8
            this.image.src = './assets/golem-sprite.png'
        }

        // Values for Enemies
        this.topPath = this.fraction * 6.5
        this.bottomPath = (this.fraction * 10) - this.fraction
        this.enemyPos = { x: 0, y: this.randomSpawnPos() }
    }

    // Setting the environment
    randomSpawnPos() {
        const randomSpawn = Math.floor(Math.random() * (this.bottomPath - this.topPath + 1) + this.topPath)
        const newPosY = randomSpawn - this.enemySize.h
        return +newPosY
    }

    enemyMove() {
        this.enemyPos.x += this.enemySpeed
    }

    drawE(framesCounter) {
        // src, src.x, src.y, frame.w, frame.h, canvas.x, canvas.y, canvas.w, canvas.h
        if (this.enemyType === 'regular') {
            this.ctx.drawImage(this.image,
                this.image.width / this.image.frames * this.image.framesIndex,
                0,
                this.image.width / this.image.frames,
                this.image.height,
                this.enemyPos.x,
                this.enemyPos.y,
                this.fraction * 1.5,
                this.fraction * 1.5)
        }
        if (this.enemyType === 'fast') {
            this.ctx.drawImage(
                this.image,
                this.image.width / this.image.frames * this.image.framesIndex,
                0,
                this.image.width / this.image.frames,
                this.image.height,
                this.enemyPos.x,
                this.enemyPos.y,
                this.fraction * 1.2,
                this.fraction * 1.2)
        }
        if (this.enemyType === 'strong') {
            this.ctx.drawImage(this.image,
                this.image.width / this.image.frames * this.image.framesIndex,
                0,
                this.image.width / this.image.frames,
                this.image.height,
                this.enemyPos.x,
                this.enemyPos.y,
                this.fraction * 2,
                this.fraction * 2)
        }
        if (this.enemyType === 'boss') {
            this.ctx.drawImage(this.image,
                this.image.width / this.image.frames * this.image.framesIndex,
                0,
                this.image.width / this.image.frames,
                this.image.height,
                this.enemyPos.x,
                this.enemyPos.y,
                this.fraction * 3,
                this.fraction * 3)
        }
        this.animate(framesCounter)
        this.enemyMove()
    }

    animate(framesCounter) {
        if (framesCounter % 4 == 0) {
            this.image.framesIndex++;
        }

        if (this.image.framesIndex >= this.image.frames) {
            this.image.framesIndex = 0
        }
    }
}