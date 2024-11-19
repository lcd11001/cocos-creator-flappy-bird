import { __private, _decorator, CCFloat, CCInteger, Component, director, EventKeyboard, EventTouch, Input, input, KeyCode, Node } from 'cc';
import { Ground } from './Ground';
import { Result } from './Result';
import { Bird } from './Bird';
import { PipePool } from './PipePool';
import { Pipes } from './Pipes';
const { ccclass, property } = _decorator;

@ccclass('GameControl')
export class GameControl extends Component
{
    @property({ type: CCInteger })
    public speed: number = 300;

    @property({ type: CCInteger })
    public pipeSpeed: number = 200;

    @property({ type: CCFloat })
    public pipeInterval: number = 2;

    @property({ type: Ground })
    public ground: Ground = null;

    @property({ type: Result })
    public result: Result = null;

    @property({ type: Bird })
    public bird: Bird = null;

    @property({ type: PipePool })
    public pipePool: PipePool = null;

    private pipeTimer: number = 0;
    private allowSpawnPipe: boolean = false;

    onLoad()
    {
        this.initListener();
    }

    protected start(): void
    {
        this.initGame();
    }

    initListener()
    {
        input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
    }

    onTouchStart(event: EventTouch)
    {
        // console.log('touch start', event.getLocation());
        this.bird.fly();
    }

    onKeyDown(event: EventKeyboard)
    {
        // console.log('key down', event.keyCode);
        switch (event.keyCode)
        {
            case KeyCode.SPACE:
                this.bird.fly();
                break;

            case KeyCode.KEY_A:
                this.gameOver();
                break;

            case KeyCode.KEY_P:
                this.result.addScore();
                break;

            case KeyCode.KEY_Q:
                this.resetGame();
                break;

            default:
                this.startGame();
                break;
        }
    }

    initGame()
    {
        this.ground.setSpeed(this.speed);
        this.ground.startLocation();

        this.result.showPressAnyKey();

        director.pause();
    }

    resetGame()
    {
        this.result.resetScore();
        this.bird.resetBird();
        this.startGame();
    }

    startGame()
    {
        this.allowSpawnPipe = true;
        this.pipeTimer = this.pipeInterval;

        this.result.hideResult();
        director.resume();
    }

    gameOver()
    {
        this.result.showResult();
        director.pause();
    }

    passPipe(pipe: Pipes)
    {
        this.result.addScore();
        this.pipePool.recyclePipe(pipe);
    }

    spwanPipe()
    {
        this.pipePool.getPipe();
    }

    protected update(dt: number): void
    {
        if (this.allowSpawnPipe)
        {
            this.pipeTimer += dt;
            if (this.pipeTimer >= this.pipeInterval)
            {
                this.pipeTimer = 0;
                this.spwanPipe();
            }
        }
    }
}


