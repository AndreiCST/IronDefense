class Map {
    constructor(ctx, canvasSize, fraction) {
        // Valores traidos de App
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.fraction = fraction

        // this.image1 = new Image()
        // this.image1.src = './assets/TilePack/Bricks-02.png'


        this.grass = new Image()
        this.grass.src = './assets/grass-tile.png'

        this.stone = new Image()
        this.stone.src = './assets/stone-tile.png'

        this.castle = new Image()
        this.castle.src = './assets/castle.png'
    }

    drawM() { /* fillRect(X, Y, W, H) */
        const grassTiling = this.ctx.createPattern(this.grass, 'repeat')
        this.ctx.fillStyle = grassTiling
        this.ctx.fillRect(0, 0, this.canvasSize.w, this.fraction * 6)

        const stoneTiling = this.ctx.createPattern(this.stone, 'repeat')
        this.ctx.fillStyle = stoneTiling
        this.ctx.fillRect(0, this.fraction * 6, this.canvasSize.w, this.fraction * 4)

        this.ctx.fillStyle = grassTiling
        this.ctx.fillRect(0, this.fraction * 10, this.canvasSize.w, this.fraction * 6)

        this.drawC()
    }

    drawC() { /* draw (img, X, Y, W, H) */
        this.ctx.drawImage(this.castle, this.canvasSize.w - 160, (this.canvasSize.h / 2) - 60, 120, 120)
    }
}