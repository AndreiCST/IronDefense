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
    FPS: 60,

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
        this.canvasSize = { w: 900, h: 500 }
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
        setInterval(() => {
            this.clearAll()
            this.drawAll()
        }, 1000 / this.FPS)
    },

    drawAll() {

    },

    clearAll() {
        this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h)
    },


}