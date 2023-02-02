const IronDefense = {
    title: 'Iron Defense',
    description: 'The Best Tower Defense Game made in Vanilla JavaScript',
    authors: 'Andrei Costea & Daniel Salomon',
    license: undefined,
    version: '1.0.0',
    canvasTag: undefined,
    ctx: undefined,
    canvasSize: { w: undefined, h: undefined },
    FPS: 60,
    framesCounter: 0,
    minuteCounter: 0,
    healthUpgrade: 1,
    fraction: undefined,
    spawnRate: 100,
    keys: {
        ONE: 'Digit1', // Keyboard 1
        TWO: 'Digit2', // Keyboard 2
        THREE: 'Digit3', // Keyboard 3
        PAUSE: 'KeyP', // Keyboard P
    },
    gamePaused: false,
    chao: false,
    AUDIO: new Audio('./audio/AUDIO'),

    lives: 100,
    map: undefined,
    towers: [],
    selectedTower: '',
    enemies: [],
    coins: 300,
    towerCost: {
        tower1: 30,
        tower2: 60,
        tower3: 100
    },

    // SETTINGS
    init() {
        this.setContext()
        this.setDimensions()
        this.start()
        this.actions()
        this.generateTower()
    },

    setContext() {
        this.canvasTag = document.querySelector('canvas')
        this.ctx = this.canvasTag.getContext('2d')
    },

    setDimensions() {
        this.canvasSize = { w: window.innerWidth, h: window.innerHeight - 170 }
        this.canvasTag.setAttribute('width', this.canvasSize.w)
        this.canvasTag.setAttribute('height', this.canvasSize.h)
        this.fraction = this.canvasSize.h / 16
    },

    // ANIMATE
    start() {
        alert('PRESS TO START')
        setInterval(() => {
            if (!this.chao) {
                if (!this.gamePaused) {
                    if (this.framesCounter >= 3600) {
                        this.framesCounter = 0
                        this.minuteCounter++
                    } else {
                        this.framesCounter++
                    }
                    this.clearAll()
                    this.drawAll()
                    this.generateEnemies(this.spawnRate, this.minuteCounter, this.healthUpgrade)
                    this.checkCollision()
                    this.livesCounter()
                    this.coinsCounter()
                    this.enemyDensity()
                    this.gameOver()
                }
            }
        }, 1000 / this.FPS)

    },

    drawAll() {
        this.drawMap()
        this.drawEnemies()
        this.drawTower()
    },

    clearAll() {
        this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h)
    },

    actions() {
        if (!this.gamePaused) {
            document.onkeyup = event => {
                this.selectTower(event)
            }
            document.onkeydown = event => {
                this.gamePause(event)
            }
        }
    },

    gamePause(event) {
        if (event.code === this.keys.PAUSE) {
            this.gamePaused = !this.gamePaused
        }
    },

    gameOver() {
        if (this.lives <= 0) {
            this.chao = !this.chao
        }
    },

    // MAP
    drawMap() {
        this.map = new Map(this.ctx, this.canvasSize, this.fraction)
        this.map.drawM()
    },

    // TOWERS
    selectTower(event) {
        if (event.code === this.keys.ONE && this.coins >= this.towerCost.tower1) this.selectedTower = 'tower1'
        if (event.code === this.keys.TWO && this.coins >= this.towerCost.tower2) this.selectedTower = 'tower2'
        if (event.code === this.keys.THREE && this.coins >= this.towerCost.tower3) this.selectedTower = 'tower3'
    },

    generateTower() {
        this.canvasTag.addEventListener('click', (event) => {
            let clickPosX = event.offsetX
            let clickPosY = event.offsetY
            if (clickPosY < this.fraction * 6 - 32) {
                let towerDir = 'shootDown'
                this.towers.push(new Tower(this.ctx, this.fraction, this.framesCounter, clickPosX, clickPosY, this.selectedTower, towerDir))
                if (this.selectedTower === 'tower1') {
                    this.coins -= this.towerCost.tower1
                }
                if (this.selectedTower === 'tower2') {
                    this.coins -= this.towerCost.tower2
                }
                if (this.selectedTower === 'tower3') {
                    this.coins -= this.towerCost.tower3
                }
                this.selectedTower = ''
            }
            if (clickPosY > this.fraction * 10 + 32) {
                let towerDir = 'shootUp'
                this.towers.push(new Tower(this.ctx, this.fraction, this.framesCounter, clickPosX, clickPosY, this.selectedTower, towerDir))
                if (this.selectedTower === 'tower1') {
                    this.coins -= this.towerCost.tower1
                }
                if (this.selectedTower === 'tower2') {
                    this.coins -= this.towerCost.tower2
                }
                if (this.selectedTower === 'tower3') {
                    this.coins -= this.towerCost.tower3
                }
                this.selectedTower = ''
            }
        })
    },

    drawTower() {
        this.towers.forEach(elm => elm.drawT(this.framesCounter))
    },

    // ENEMIES
    generateEnemies(spawnRate, minute, healthUpgrade) {
        if (this.framesCounter % spawnRate === 0) {
            this.enemies.push(new Enemy(this.ctx, this.fraction, 'regular', healthUpgrade))
        }
        if (this.framesCounter % spawnRate === 0) {
            this.enemies.push(new Enemy(this.ctx, this.fraction, 'fast', healthUpgrade))
        }
        if (this.framesCounter % spawnRate === 0 && minute > 1) {
            this.enemies.push(new Enemy(this.ctx, this.fraction, 'strong', healthUpgrade))
        }
        if (this.framesCounter % spawnRate === 0 && minute > 2) {
            this.enemies.push(new Enemy(this.ctx, this.fraction, 'boss', healthUpgrade))
        }
    },

    drawEnemies() {
        this.enemies.forEach(elm => elm.drawE(this.framesCounter))
    },

    doEnemyDmg(enemy, bullet) {
        enemy.enemyHealth -= bullet.bulletDmg
        if (enemy.enemyHealth <= 0) {
            this.clearEnemy(enemy)
            this.coins += enemy.enemyReward
        }
    },

    clearEnemy(enemy) {
        this.enemies = this.enemies.filter(elem => elem !== enemy)
    },

    // COLLISIONS
    checkCollision() {
        this.bulletCollision()
        this.livesCollision()
    },

    bulletCollision() {
        this.enemies.forEach(enemy => {
            this.towers.forEach(tower => tower.bullets.forEach(bullet => {
                if (
                    enemy.enemyPos.x < bullet.bulletPosX + bullet.bulletW &&
                    enemy.enemyPos.x + enemy.enemySize.w > bullet.bulletPosX &&
                    enemy.enemyPos.y < bullet.bulletPosY + bullet.bulletH &&
                    enemy.enemyPos.y + enemy.enemySize.h > bullet.bulletPosY
                ) {
                    this.doEnemyDmg(enemy, bullet)
                    tower.bullets = tower.bullets.filter(elem => elem !== bullet)
                }
            }))
        })
    },

    livesCollision() {
        this.enemies.forEach(elem => {
            if (elem.enemyPos.x >= this.canvasSize.w - 140) {
                this.enemies = this.enemies.filter(elem => elem.enemyPos.x < this.canvasSize.w - 140)
                this.lives -= 1
                // this.AUDIO.play()

                console.log('PERDISTE UNA VIDA')
            }
        })
    },

    livesCounter() {
        this.ctx.fillStyle = 'white'
        this.ctx.font = '24px sans-serif'
        this.ctx.fillText(`Lives: ${this.lives}`, this.canvasSize.w - this.fraction * 5, this.fraction * 2)
    },

    coinsCounter() {
        this.ctx.fillStyle = 'white'
        this.ctx.font = '24px sans-serif'
        this.ctx.fillText(`Coins: ${this.coins}`, this.canvasSize.w - this.fraction * 5, this.fraction)
    },

    // ROUNDS
    enemyDensity() {
        if (this.minuteCounter < 1) {
            this.spawnRate * 1
            console.log(this.healthUpgrade)
        }
        if (this.minuteCounter === 1) {
            if (this.healthUpgrade === 1) {
                this.healthUpgrade += 1
                this.spawnRate * 0.5
            }
            console.log(this.healthUpgrade)
        }
        if (this.minuteCounter === 2) {
            if (this.healthUpgrade === 2) {
                this.healthUpgrade += 1
                this.spawnRate * 0.1
            }
            console.log(this.healthUpgrade)
        }
        if (this.minuteCounter === 3) {
            if (this.healthUpgrade === 3) {
                this.healthUpgrade += 1
                this.spawnRate * 0.01
            }
            console.log(this.healthUpgrade)
        }
        if (this.minuteCounter === 4) {
            if (this.healthUpgrade === 4) {
                this.healthUpgrade += 1
                this.spawnRate * 0.001
            }
            console.log(this.healthUpgrade)
        }
    },
}