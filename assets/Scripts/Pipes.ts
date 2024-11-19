import { _decorator, CCInteger, Collider2D, Component, find, Node, random, UITransform, Vec3 } from 'cc';
import { GameControl } from './GameControl';
const { ccclass, property } = _decorator;

const randomAB = (a: number, b: number) =>
{
    return Math.random() * (b - a) + a;
}

@ccclass('Pipes')
export class Pipes extends Component
{
    @property({ type: Node, tooltip: 'The top pipe node' })
    public topPipe: Node = null;

    @property({ type: Node, tooltip: 'The bottom pipe node' })
    public bottomPipe: Node = null;

    @property({ type: CCInteger, tooltip: 'The speed of the pipe' })
    public speed: number = 0;

    @property({ type: CCInteger, tooltip: 'The randomize gap distance between the pipes', readonly: true })
    public gap: number = 0;

    @property({ type: CCInteger, tooltip: 'The min gap distance between the pipes', step: 1 })
    public minGap: number = 100;

    @property({ type: CCInteger, tooltip: 'The max gap distance between the pipes', step: 1 })
    public maxGap: number = 400;

    @property({ type: CCInteger, tooltip: 'The randomize offset of pipe', readonly: true })
    public offset: number = 0;

    @property({ type: CCInteger, tooltip: 'The min offset of pipe', step: 1 })
    public minOffset: number = -100;

    @property({ type: CCInteger, tooltip: 'The max offset of pipe', step: 1 })
    public maxOffset: number = 100;

    private pipeLocation: Vec3 = new Vec3(0, 0, 0);
    private canvasSizeX: number = 0;
    private pipeSizeX: number = 0;
    private startPipeX: number = 0;
    private isOutOfScreen: boolean = false;

    private gameControl: GameControl = null;
    private colliderTop: Collider2D = null;
    private colliderBottom: Collider2D = null;

    protected onLoad(): void
    {
        console.log('pipe on load', this.node.uuid);
        this.getColliders();

        this.getCanvasSize();

        this.getPipeSpeed();
        this.getPipesSize();

        this.initPipe();
    }

    private getColliders()
    {
        this.colliderTop = this.topPipe.getComponent(Collider2D);
        this.colliderBottom = this.bottomPipe.getComponent(Collider2D);
    }

    getPipeSpeed()
    {
        const control = find('GameControl');
        if (control)
        {
            this.gameControl = control.getComponent(GameControl);
            this.speed = this.gameControl.pipeSpeed;
        }
    }

    getPipesSize()
    {
        if (this.topPipe)
        {
            const transform = this.topPipe.getComponent(UITransform);
            this.pipeSizeX = transform.width * transform.node.scale.x;
        }
    }

    getCanvasSize()
    {
        const canvas = find('Canvas');
        if (canvas)
        {
            this.canvasSizeX = canvas.getComponent(UITransform).width;
            // console.log('canvasSizeX', this.canvasSizeX);
        }
    }


    initPipe()
    {
        this.gap = randomAB(this.minGap, this.maxGap);
        this.offset = randomAB(this.minOffset, this.maxOffset);

        const topPipeLocation = new Vec3(0, this.offset + (this.gap * 0.5), 0);
        const bottomPipeLocation = new Vec3(0, this.offset - (this.gap * 0.5), 0);

        this.topPipe.setPosition(topPipeLocation);
        this.bottomPipe.setPosition(bottomPipeLocation);

        this.startPipeX = this.canvasSizeX * 0.5 + this.pipeSizeX;
        this.pipeLocation = new Vec3(this.startPipeX, 0, 0);
        this.node.setPosition(this.pipeLocation);
    }

    update(dt: number)
    {
        if (this.isOutOfScreen)
        {
            return;
        }

        this.movePipe(this.speed, dt);

        if (this.isPipeOut())
        {
            // console.log('pipe out');
            this.gameControl.passPipe(this);
        }
    }

    movePipe(speed: number, dt: number)
    {
        this.pipeLocation.x -= speed * dt;
        this.node.setPosition(this.pipeLocation);
    }

    isPipeOut()
    {
        return this.pipeLocation.x < -this.startPipeX;
    }

    reuse()
    {
        console.log('reuse pipe');
        this.initPipe();
        this.isOutOfScreen = false;
        if (this.colliderTop && this.colliderBottom)
        {
            this.colliderTop.enabled = true;
            this.colliderBottom.enabled = true;
        }
    }

    unuse()
    {
        console.log('unuse pipe');
        this.isOutOfScreen = true;
        if (this.colliderTop && this.colliderBottom)
        {
            this.colliderTop.enabled = false;
            this.colliderBottom.enabled = false;
        }
    }
}



