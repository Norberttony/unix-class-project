
class Graph {
    constructor(ctx, data){
        this.ctx = ctx;
        this.data = data;

        this.guidelines = 4;
        this.threshold = 50;
        this.maxValue = 100;

        this.color = this.ctx.canvas.computedStyleMap().get("--secondary-color")[0];
    }

    draw(){
        // clear canvas
        const canvas = this.ctx.canvas;
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // draw guidelines
        // this.ctx.strokeStyle = this.color;
        // this.ctx.lineWidth = 1;
        // for (let i = 1; i <= this.guidelines; i++){
        //     const y = canvas.height * i / (this.guidelines + 1);
        //     this.ctx.beginPath();
        //     this.ctx.moveTo(0, y);
        //     this.ctx.lineTo(canvas.width, y);
        //     this.ctx.stroke();
        // }

        // draw data
        if (this.data.length > 0){
            this.ctx.lineWidth = 3;
            this.ctx.strokeStyle = this.color;

            this.ctx.beginPath();
            this.ctx.moveTo(0, this.getY(this.data[0]));
            for (let t = 1; t < this.data.length; t++){
                this.ctx.lineTo(canvas.width * t / (this.data.length - 1), this.getY(this.data[t]));
            }

            this.ctx.stroke();
        }

        // draw threshold
        {
            this.ctx.lineWidth = 1;
            this.ctx.strokeStyle = "red";
            this.ctx.fillStyle = "rgba(255, 0, 0, 0.2)";

            const y = this.getY(this.threshold);
            this.ctx.beginPath();
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(canvas.width, y);
            this.ctx.stroke();

            this.ctx.fillRect(0, 0, canvas.width, y);
        }
    }

    getY(val){
        return this.ctx.canvas.height * (1 - val / this.maxValue);
    }
}
