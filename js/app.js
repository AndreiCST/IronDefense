const IronDefense = {
    title: 'Iron Defence',
    description: 'The Best Tower Defense Game made in Vanilla JavaScript',
    authors: 'Andrei & Daniel',
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
        FIVE: 'Digit5', // Keyboard 5
    },
    map: undefined,
    towers: [],
    selectedTower: 'tower1',
    enemies: [],

    // SETTINGS
    init() {
        this.setContext()
        this.setDimensions()
        this.start()
        this.selectTower()
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

            this.framesCounter > 5000 ? this.framesCounter = 0 : this.framesCounter++
            // if (this.pauseGame) { this.pauseGame() }
            this.clearAll()
            this.drawAll()
            this.generateEnemies()
        }, 1000 / this.FPS)
    },

    drawAll() {
        this.drawMap()
        this.drawEnemies()
        this.drawTower()
        this.checkCollision()
    },

    clearAll() {
        this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h)
    },

    // PAUSE
    // pauseGame() {
    //     document.onkeydown = event => {
    //         if (event.code === this.keys.FIVE) {
    //             alert('GAME PAUSED')
    //         }
    //         return true
    //     }
    // },

    // GAME OVER
    // takeLife() {
    //     if (bulletCollision) {
    //         lives--
    //     }
    // },

    // gameOver() {
    // if (lives === 0) {
    //     loose
    // }
    // },

    // MAP
    drawMap() {
        this.map = new Map(this.ctx, this.canvasSize, this.fraction)
        this.map.drawM()
    },

    // TOWERS
    selectTower() {
        document.onkeydown = event => {
            if (event.code === this.keys.ONE) this.selectedTower = 'tower1'
            if (event.code === this.keys.TWO) this.selectedTower = 'tower2'
            if (event.code === this.keys.THREE) this.selectedTower = 'tower3'
        }
    },

    generateTower() {
        this.canvasTag.addEventListener('click', (event) => {
            let clickPosX = event.offsetX
            let clickPosY = event.offsetY
            if (clickPosY < this.fraction * 6 - 32) {
                let towerDir = 'shootDown'
                this.towers.push(new Tower(this.ctx, this.fraction, this.selectedTower, clickPosX, clickPosY, towerDir))
            }
            if (clickPosY > this.fraction * 10 + 32) {
                let towerDir = 'shootUp'
                this.towers.push(new Tower(this.ctx, this.fraction, this.selectedTower, clickPosX, clickPosY, towerDir))
            }
        })
    },

    drawTower() {
        this.towers.forEach(elm => elm.drawT())
    },

    // ENEMIES
    generateEnemies() {
        if (this.enemies.length <= 40) {
            if (this.framesCounter % 50 === 0) {
                this.enemies.push(new Enemy(this.ctx, this.fraction, 'regular'))
            }
            if (this.framesCounter % 50 === 0) {
                this.enemies.push(new Enemy(this.ctx, this.fraction, 'fast'))
            }
            if (this.framesCounter % 50 === 0) {
                this.enemies.push(new Enemy(this.ctx, this.fraction, 'strong'))
            }
            if (this.framesCounter % 200 === 0) {
                this.enemies.push(new Enemy(this.ctx, this.fraction, 'boss'))
            }
        }
    },

    drawEnemies() {
        this.enemies.forEach(elm => elm.drawE())
    },

    clearEnemy(enemy) {
        this.enemies = this.enemies.filter(elem => elem !== enemy)
    },

    // clearBullet(towerArray, bullet) {
    //     towerArray = towerArray.filter(elem => elem !== bullet)
    // },

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
                    this.clearEnemy(enemy)
                    // this.clearBullet(tower.bullets, bullet)
                    tower.bullets = tower.bullets.filter(elem => elem !== bullet)
                    // return doDamage = true //doDamage -> quitarle health al enemy && quitar bala
                }
            }))
        })
    },

    livesCollision() {
        this.enemies = this.enemies.filter(elm => elm.enemyPos.x < this.canvasSize.w)
    }
}




// COSAS QUE FALTAN

// TIMER
// DINERO
// COLLISIONS
// VIDAS
// RONDAS
//
//
//
//
