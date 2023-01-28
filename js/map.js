class Map {

    constructor(ctx, w, h) {
        this.ctx = ctx
        this.bgDimensions = { w: w, h: h }
        this.aSeventhHeight = this.bgDimensions.h / 7
        this.aSeventhWidth = this.bgDimensions.w / 16
        this.btnDimensions = { w: this.aSeventhWidth, h: this.aSeventhWidth }
        this.marginButtons1 = this.aSeventhWidth / 8
        this.marginButtons2 = (this.aSeventhWidth / 8) * 2


        // this.button = { w: XXX, h: XXX }
    }

    drawBg() {
        this.ctx.fillStyle = '#3A831D' // Verde - Place towers
        this.ctx.fillRect(0, 0, this.bgDimensions.w, this.aSeventhHeight * 2)
        this.ctx.fillStyle = '#FFD593' // Beige - Enemies' path
        this.ctx.fillRect(0, this.aSeventhHeight * 2, this.bgDimensions.w, this.aSeventhHeight * 2)
        this.ctx.fillStyle = '#3A831D' // Verde - Place towers
        this.ctx.fillRect(0, this.aSeventhHeight * 4, this.bgDimensions.w, this.aSeventhHeight * 2)
        this.ctx.fillStyle = '#D9D9D9' // Gris - GUI
        this.ctx.fillRect(0, this.aSeventhHeight * 6, this.bgDimensions.w, this.aSeventhHeight)
    }

    drawButtons() { /* X Y W H */
        const startPos = { x: this.marginButtons1, y: this.aSeventhHeight * 6 + this.marginButtons2 }

        // First Tower Selector
        this.ctx.fillStyle = '#000000' // Negro - Torre 1 en GUI
        this.ctx.fillRect(startPos.x, startPos.y, this.btnDimensions.w, this.btnDimensions.h)

        // // Second Tower Selector
        this.ctx.fillStyle = '#FF0000' // Rojo - Torre 2 en GUI
        this.ctx.fillRect(startPos.x + this.btnDimensions.w, startPos.y, this.btnDimensions.w, this.btnDimensions.h)

        // // Third Tower Selector
        this.ctx.fillStyle = '#FFFF00' // Amarillo - Torre 3 en GUI
        this.ctx.fillRect(startPos.x + (this.btnDimensions.w * 2), startPos.y, this.btnDimensions.w, this.btnDimensions.h)
    }
}