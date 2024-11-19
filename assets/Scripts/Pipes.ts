import { _decorator, Component, Node, random, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Pipes')
export class Pipes extends Component
{
    @property({ type: Node, tooltip: 'The top pipe node' })
    public topPipe: Node = null;

    @property({ type: Node, tooltip: 'The bottom pipe node' })
    public bottomPipe: Node = null;

    @property({ type: Number, tooltip: 'The speed of the pipe' })
    public speed: number = 0;

    @property({ type: Number, tooltip: 'The randomize gap distance between the pipes', readonly: true })
    public gap: number = 0;

    @property({ type: Number, tooltip: 'The min gap distance between the pipes', step: 1 })
    public minGap: number = 100;

    @property({ type: Number, tooltip: 'The max gap distance between the pipes', step: 1 })
    public maxGap: number = 400;

    @property({ type: Number, tooltip: 'The randomize offset of pipe', readonly: true })
    public offset: number = 0;

    @property({ type: Number, tooltip: 'The min offset of pipe', step: 1 })
    public minOffset: number = -100;

    @property({ type: Number, tooltip: 'The max offset of pipe', step: 1 })
    public maxOffset: number = 100;


    private topPipeLocation: Vec3 = new Vec3(0, 0, 0);
    private bottomPipeLocation: Vec3 = new Vec3(0, 0, 0);
    private screenSizeX: number = 0; //screen.width;

    protected onLoad(): void
    {
        this.initPipe();
    }


    initPipe()
    {
        this.topPipeLocation = this.topPipe.getPosition();
        this.bottomPipeLocation = this.bottomPipe.getPosition();

        this.gap = random() * (this.maxGap - this.minGap) + this.minGap;
        this.offset = random() * (this.maxOffset - this.minOffset) + this.minOffset;

        this.topPipe.setPosition(this.topPipeLocation.x + this.screenSizeX, this.topPipeLocation.y + (this.gap * 0.5) + this.offset, this.topPipeLocation.z);
        this.bottomPipe.setPosition(this.bottomPipeLocation.x + this.screenSizeX, this.bottomPipeLocation.y - (this.gap * 0.5) + this.offset, this.bottomPipeLocation.z);
    }
}


