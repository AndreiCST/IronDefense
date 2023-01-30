class Enemy {

    constructor(ctx, fraction, enemyType) {
        // Values from App
        this.ctx = ctx
        this.fraction = fraction

        // Types of Enemies
        if (enemyType === 'fast') {
            // low health, high speed
            this.enemySize = { w: 15, h: 15 }
            this.enemyHealth = 70
            this.enemyReward = 5
            this.enemySpeed = 5
        }

        if (enemyType === 'regular') {
            // normal health, normal speed
            this.enemySize = { w: 20, h: 20 }
            this.enemyHealth = 100
            this.enemyReward = 3
            this.enemySpeed = 4
        }

        if (enemyType === 'strong') {
            // high health, low speed
            this.enemySize = { w: 30, h: 30 }
            this.enemyHealth = 150
            this.enemyReward = 8
            this.enemySpeed = 2
        }

        if (enemyType === 'boss') {
            // high health, low speed
            this.enemySize = { w: 50, h: 50 }
            this.enemyHealth = 200
            this.enemyReward = 15
            this.enemySpeed = 1
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

    draw() {
        this.enemyMove()
        // TEMPORAL
        this.ctx.fillStyle = 'blue' // Rosa - Enemigo 1 en Map
        this.ctx.fillRect(this.enemyPos.x, this.enemyPos.y, this.enemySize.w, this.enemySize.h)
    }
}