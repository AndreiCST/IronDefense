class Map {

    constructor(ctx, canvasSize, fraction) {
        // Valores traidos de App
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.fraction = fraction
    }

    draw() { /* fillRect(X, Y, W, H) */
        this.ctx.fillStyle = '#3A831D' // Verde - Place towers
        this.ctx.fillRect(0, 0, this.canvasSize.w, this.fraction * 6)
        // console.log(`bgSection * 4: ${this.bgSection * 4}`)
        this.ctx.fillStyle = '#FFD593' // Beige - Enemies' path
        this.ctx.fillRect(0, this.fraction * 6, this.canvasSize.w, this.fraction * 4)
        // console.log(`bgSection * 2: ${this.bgSection * 2}`)
        this.ctx.fillStyle = '#3A831D' // Verde - Place towers
        this.ctx.fillRect(0, this.fraction * 10, this.canvasSize.w, this.fraction * 6)
        // console.log(`bgSection * 9: ${this.bgSection * 9}`)
        // console.log(`canvasSize.w: ${this.canvasSize.w}`)
    }
}