class Map {

    constructor(ctx, canvasSize, fraction) {
        // Valores traidos de App
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.fraction = fraction

        this.image = new Image()
    }

    drawM() { /* fillRect(X, Y, W, H) */
        this.ctx.fillStyle = '#3A831D' // Verde - Place towers
        this.ctx.fillRect(0, 0, this.canvasSize.w, this.fraction * 6)

        this.ctx.fillStyle = '#FFD593' // Beige - Enemies' path
        this.ctx.fillRect(0, this.fraction * 6, this.canvasSize.w, this.fraction * 4)

        this.ctx.fillStyle = '#3A831D' // Verde - Place towers
        this.ctx.fillRect(0, this.fraction * 10, this.canvasSize.w, this.fraction * 6)

        this.drawC()
    }

    drawC() { /* fillRect(X, Y, W, H) */
        this.ctx.fillStyle = '#3A831D' // Verde - Castillo
        this.ctx.fillRect(this.canvasSize.w - 150, this.fraction * 6 - 10, 150, this.fraction * 4 + 20)

        this.ctx.fillStyle = '#FFD593' // Verde - Castillo
        this.ctx.fillRect(this.canvasSize.w - 120, this.fraction * 6 + 40, this.fraction * 2, this.fraction * 2)

        // this.image.src = './assets/TowerPack/tower1D.gif'
        // this.ctx.drawImage(this.image, this.towerPosX, this.towerPosY, this.towerSizeW, this.towerSizeH)
    }
}