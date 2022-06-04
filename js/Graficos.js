class Graficos{

    static dibujarCirculo(x,y,radio,color,rellenar,ctx){
        ctx.beginPath();
        ctx.arc(x, y, radio, 0, 2 * Math.PI, false);
        if(rellenar){
            ctx.fillStyle = color;
            ctx.fill();
        }else{
            ctx.strokeStyle = color;
            ctx.stroke();
            ctx.stroke(); ctx.stroke(); ctx.stroke(); ctx.stroke(); ctx.stroke(); ctx.stroke(); ctx.stroke(); ctx.stroke(); ctx.stroke(); ctx.stroke(); ctx.stroke(); ctx.stroke(); ctx.stroke(); ctx.stroke(); ctx.stroke(); ctx.stroke(); ctx.stroke(); ctx.stroke(); ctx.stroke(); ctx.stroke(); ctx.stroke(); ctx.stroke(); ctx.stroke(); ctx.stroke(); ctx.stroke(); ctx.stroke(); ctx.stroke(); ctx.stroke(); ctx.stroke(); ctx.stroke(); ctx.stroke(); ctx.stroke(); ctx.stroke(); ctx.stroke(); ctx.stroke(); ctx.stroke(); ctx.stroke(); ctx.stroke(); ctx.stroke(); ctx.stroke(); ctx.stroke(); ctx.stroke(); ctx.stroke(); ctx.stroke(); ctx.stroke(); ctx.stroke(); ctx.stroke(); ctx.stroke(); ctx.stroke(); ctx.stroke(); ctx.stroke(); ctx.stroke(); ctx.stroke(); ctx.stroke(); ctx.stroke(); ctx.stroke(); ctx.stroke(); ctx.stroke(); ctx.stroke(); ctx.stroke(); ctx.stroke(); ctx.stroke(); ctx.stroke(); ctx.stroke(); ctx.stroke(); ctx.stroke();
        }
    }
}