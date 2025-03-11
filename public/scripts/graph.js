
class Graph {
    constructor(ctx, data){
        this.ctx = ctx;
        this.data = data;

        this.guidelines = 4;
        this.threshold = 50;
        this.maxValue = 100;

        this.color = this.ctx.canvas.computedStyleMap().get("--secondary-color")[0];

        this.thresholdLabel = this.createLabel(this.threshold);
        
        this.ctx.canvas.addEventListener("mousemove", (event) => {
            if (!event.buttons)
                return;

            this.threshold = this.maxValue * (1 - event.offsetY / this.ctx.canvas.height);
            this.setLabel(this.thresholdLabel, this.threshold);
            this.draw();
        });
    }

    createLabel(val){
        const label = document.createElement("div");
        label.classList.add("dashboard__graph-label");
        this.setLabel(label, val);
        this.ctx.canvas.parentNode.appendChild(label);
        return label;
    }

    setLabel(label, val){
        label.style.top = `${100 * (1 - val / this.maxValue)}%`;
        label.innerText = Math.round(val);
    }

    // check the last few data points to see if they exceed the threshold
    exceedsThreshold(){
        return Math.max(...this.data.slice(this.data.length - 10)) > this.threshold;
    }

    draw(){
        // clear canvas
        const canvas = this.ctx.canvas;
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);

        const exceedsThreshold = this.exceedsThreshold();
        
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
            this.ctx.lineWidth = 2;
            this.ctx.strokeStyle = exceedsThreshold ? "red" : this.color;
            this.ctx.fillStyle = exceedsThreshold ? "rgba(255, 0, 0, 0.1)" : "rgba(0, 239, 255, 0.1)";

            this.ctx.beginPath();
            this.ctx.moveTo(0, this.getY(this.data[0]));
            for (let t = 1; t < this.data.length; t++){
                this.ctx.lineTo(canvas.width * t / (this.data.length - 1), this.getY(this.data[t]));
            }

            this.ctx.stroke();

            this.ctx.lineTo(canvas.width, canvas.height);
            this.ctx.lineTo(0, canvas.height);
            this.ctx.fill();
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
