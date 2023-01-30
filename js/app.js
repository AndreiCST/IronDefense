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
    },
    buttons: {
        tower1: document.querySelector('.tower1'),
        tower2: document.querySelector('.tower2'),
        tower3: document.querySelector('.tower3')
    },

    map: undefined,
    bullets: undefined,
    tower: undefined,
    towers: [],
    enemy: undefined,
    enemies: [],

    selectedTower: 'tower1',

    init() {
        this.setContext()
        this.setDimensions()
        this.start()
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

    start() {
        alert('press to start')

        setInterval(() => {

            this.framesCounter > 5000 ? this.framesCounter = 0 : this.framesCounter++

            this.clearAll()
            this.drawAll()
            this.generateEnemies()

            // // console.log(this.towers)
            // console.log(this.selectedTower)

        }, 1000 / this.FPS)
    },

    drawAll() {
        this.drawTower()
        this.drawMap()
        this.drawEnemies()

    },

    clearAll() {
        this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h)
    },

    // MAPA
    drawMap() {
        this.map = new Map(this.ctx, this.canvasSize, this.fraction)
        this.map.draw()
        // console.log('cargate mapa!')
    },

    // TORRES
    generateTower() {
        document.onkeydown = event => {
            if (event.code === this.keys.ONE) this.selectedTower = 'tower1' && console.log('Tower 1 Seleccionada')
            if (event.code === this.keys.TWO) this.selectedTower = 'tower2' && console.log('Tower 2 Seleccionada')
            if (event.code === this.keys.THREE) this.selectedTower = 'tower3' && console.log('Tower 3 Seleccionada')
        }

        let towerPosX = 0
        let towerPosY = 0

        this.canvasTag.addEventListener('click', (event) => {
            towerPosX = event.offsetX
            towerPosY = event.offsetY
            this.towers.push(new Tower(this.ctx, this.fraction, this.framesCounter, this.selectedTower, this.towerPosX, this.towerPosY))

            // TEMPORAL
            this.ctx.fillStyle = 'blue'
            this.ctx.fillRect(towerPosX, towerPosY, 100, 100)
            console.log('Poner torre')
        })

        // this.towers.push(new Tower(this.ctx, this.fraction, this.framesCounter, this.selectedTower, this.towerPosX, this.towerPosY))
        console.log(this.towers)
    },

    drawTower() {
        this.towers.forEach(Tower => Tower.draw())
    },

    // ENEMIGOS
    drawEnemies() {
        this.enemies.forEach(elm => elm.draw())
    },

    generateEnemies() {
        if (this.framesCounter % 50 === 0) {
            // console.log('GENERANDO NUEVO ENEMIGO REGULAR')
            this.enemies.push(new Enemy(this.ctx, this.fraction, 'regular'))
        }
        if (this.framesCounter % 50 === 0) {
            // console.log('GENERANDO NUEVO ENEMIGO RAPIDO')
            this.enemies.push(new Enemy(this.ctx, this.fraction, 'fast'))
        }
        if (this.framesCounter % 50 === 0) {
            // console.log('GENERANDO NUEVO ENEMIGO FUERTE')
            this.enemies.push(new Enemy(this.ctx, this.fraction, 'strong'))
        }
        if (this.framesCounter % 200 === 0) {
            // console.log('GENERANDO NUEVO ENEMIGO BOSS')
            this.enemies.push(new Enemy(this.ctx, this.fraction, 'boss'))
        }
    },

    // clearEnemy() {
    //     //Si llega al final
    //     this.obstacles = this.obstacles.filter(obs => obs.posX >= 0)
    // },
}