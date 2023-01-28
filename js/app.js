const IronDefense = {
    title: 'Iron Defence',
    description: 'The Best Tower Defense Game made in Vanilla JavaScript',
    authors: 'Daniel & Andrei',
    license: undefined,
    version: '1.0.0',
    canvasTag: undefined,
    ctx: undefined,
    keys: {
        LEFTCLICK: 'mousedown'
    },
    canvasSize: { w: undefined, h: undefined },
    canvasPos: { x: undefined, y: undefined },
    FPS: 60,
    player: undefined,
    enemies: undefined,
    map: undefined,

    init() {
        this.setContext()
        this.setDimensions()
        this.setEventListeners()
        this.start()
    },

    setContext() {
        this.canvasTag = document.querySelector('canvas')
        this.ctx = this.canvasTag.getContext('2d')
    },

    setDimensions() {
        this.canvasSize = { w: window.innerWidth, h: 500 }
        this.canvasTag.setAttribute('width', this.canvasSize.w)
        this.canvasTag.setAttribute('height', this.canvasSize.h)
    },

    setEventListeners() {
        // document.onkeydown = evt => {
        //     if (evt.key === 'ArrowLeft') this.dogPosition.x -= 10
        //     if (evt.key === 'ArrowRight') this.dogPosition.x += 10
        // }
    },

    start() {
        this.drawAll()
        // setInterval(() => {
        //     this.clearAll()
        //     this.drawAll()
        // }, 10 / this.FPS)
    },

    drawAll() {
        this.drawMap()
        this.drawSingleTower()
        // thisdrawSingleEnemy()
        console.log('A JUGAR')
    },

    clearAll() {
        this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h)
    },

    drawMap() {
        this.map = new Map(this.ctx, this.canvasSize.w, this.canvasSize.h)
        this.map.drawBg()
        this.map.drawButtons()
        console.log('cargate mapa!')
    },

    drawSingleTower() {
        this.tower = new Tower(this.ctx)
        this.tower.drawTower()
        // this.setTower()
        console.log('cargate torre!')
    },

    // drawSingleEnemy() {
    //     this.enemy = new Enemy(this.ctx)
    //     // this.tower.drawTower()
    //     console.log('cargate enemigo!')
    // },

    // setTower() {
    //     this.canvasTag.addEventListener('click', (event) => {
    //         let x = event.offsetX
    //         let y = event.offsetY
    //         console.log(x, y)
    //     })
    // }

}