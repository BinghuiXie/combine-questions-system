import { Component, Vue } from 'vue-property-decorator';
import { IRGBAColor, ILine } from '@/interfaces';

@Component
export default class Canvas extends Vue {

    public $refs!: {
        canvas: HTMLCanvasElement
    }
    public canvas!: HTMLCanvasElement

    resize() {
        addEventListener('resize', () => {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;

            this.setCanvas();
        });
    }

    setCanvas() {
        this.canvas = this.$refs.canvas;
        const c = this.canvas.getContext('2d');

        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        const line1: ILine = {
            startY: this.canvas.height / 2.3,
            length: 0.001, // 欧米伽
            amplitude: 1000, // 振幅
            frequency: 1
        }
        /* 正弦曲线的颜色参数 */
        const strokeColor: IRGBAColor<number> = {
            r: 57,
            g: 109,
            b: 248,
            a: 1
        };
        /* 填充背景颜色 */
        const fillColor: IRGBAColor<number> = {
            r: 255,
            g: 255,
            b: 255,
            a: 1
        }

        if(c !== null) {
            c.fillStyle = `rgba(${fillColor.r}, ${fillColor.g}, ${fillColor.b}, ${fillColor.a})`;
            c.fillRect(0, 0, this.canvas.width, this.canvas.height);
            c.strokeStyle = `rgba(${strokeColor.r}, ${strokeColor.g}, ${strokeColor.b}, ${strokeColor.a})`;
            c.beginPath();
            c.moveTo(0, 0);
            for (let i = 0; i < this.canvas.width; i++) {
                c.lineTo(i, line1.startY + Math.sin(i * line1.length + line1.frequency) * line1.amplitude / i * 100);
            }
            c.stroke();
            c.closePath();
            
            c.beginPath();
            c.arc(0, 0, this.canvas.width / 3.5, 0, Math.PI * 2, false);
            c.closePath()

            c.stroke();

        }
        
    }

    mounted() {
        this.setCanvas();
        this.resize();
    }

    render() {
        return (
            <canvas id='canvas' ref='canvas' style='position: fixed; left: 0; top: 0;'></canvas>
        )
    }
}