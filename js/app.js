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
    fraction: undefined,
    keys: {
        ONE: 'Digit1', // Keyboard 1
        TWO: 'Digit2', // Keyboard 2
        THREE: 'Digit3', // Keyboard 3
        PAUSE: 'KeyP', // Keyboard P
    },
    gamePaused: false,

    lives: 20,
    map: undefined,
    towers: [],
    selectedTower: '',
    enemies: [],
    coins: 1000,
    towerCost: {
        tower1: 30,
        tower2: 50,
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
        this.canvasSize = { w: window.innerWidth, h: window.innerHeight }
        this.canvasTag.setAttribute('width', this.canvasSize.w)
        this.canvasTag.setAttribute('height', this.canvasSize.h)
        this.fraction = this.canvasSize.h / 16
    },

    // ANIMATE
    start() {
        alert('PRESS TO START')
        setInterval(() => {
            if (!this.gamePaused) {
                this.framesCounter > 5000 ? this.framesCounter = 0 : this.framesCounter++
                this.clearAll()
                this.drawAll()
                this.generateEnemies()
                this.gameOver()
            }
        }, 1000 / this.FPS)

    },

    drawAll() {
        this.drawMap()
        this.drawEnemies()
        this.drawTower()
        this.checkCollision()

        console.log(this.coins)
        // console.log(this.fraction)
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
        console.log('testing pause', this.gamePaused)
    },

    gameOver() {
        if (this.lives <= 0) {
            alert('PERDISTE')
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
            }
            if (clickPosY > this.fraction * 10 + 32) {
                let towerDir = 'shootUp'
                this.towers.push(new Tower(this.ctx, this.fraction, this.framesCounter, clickPosX, clickPosY, this.selectedTower, towerDir))
            }

            if (this.selectedTower === 'tower1') {
                this.coins -= this.towerCost.tower1
            }
            if (this.selectedTower === 'tower2') {
                this.coins -= this.towerCost.tower2
            }
            if (this.selectedTower === 'tower3') {
                this.coins -= this.towerCost.tower3
            }

            console.log(`Selected Tower: ${this.selectedTower}`)
            this.selectedTower = ''
            console.log(`Selected Tower: ${this.selectedTower}`)
        })
    },


    drawTower() {
        this.towers.forEach(elm => elm.drawT(this.framesCounter))
    },

    // ENEMIES
    generateEnemies() {
        if (this.enemies.length <= 40) {
            if (this.framesCounter % 100 === 0) {
                this.enemies.push(new Enemy(this.ctx, this.fraction, 'regular'))
            }
            if (this.framesCounter % 200 === 0) {
                this.enemies.push(new Enemy(this.ctx, this.fraction, 'fast'))
            }
            if (this.framesCounter % 300 === 0) {
                this.enemies.push(new Enemy(this.ctx, this.fraction, 'strong'))
            }
            if (this.framesCounter % 1000 === 0) {
                this.enemies.push(new Enemy(this.ctx, this.fraction, 'boss'))
            }
        }
    },

    drawEnemies() {
        this.enemies.forEach(elm => elm.drawE())
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
                console.log('PERDISTE UNA VIDA')
            }
        })
    },

    // ROUNDS
    // enemyDensity() {
    //     // generate 10 enemies
    //     //pause
    //     // generate 15 enemies
    // },

    // generateEnemies() {
    //     if (this.enemies.length <= 40) {
    //         if (this.framesCounter % 100 * density === 0) {
    //             this.enemies.push(new Enemy(this.ctx, this.fraction, 'regular'))
    //         }
    //         if (this.framesCounter % 200 * density === 0) {
    //             this.enemies.push(new Enemy(this.ctx, this.fraction, 'fast'))
    //         }
    //         if (this.framesCounter % 300 * density === 0) {
    //             this.enemies.push(new Enemy(this.ctx, this.fraction, 'strong'))
    //         }
    //         if (this.framesCounter % 1000 * density === 0) {
    //             this.enemies.push(new Enemy(this.ctx, this.fraction, 'boss'))
    //         }
    //     }
    // },





}