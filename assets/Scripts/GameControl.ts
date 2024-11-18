import { _decorator, CCInteger, Component, Node } from 'cc';
import { Ground } from './Ground';
import { Result } from './Result';
const { ccclass, property } = _decorator;

@ccclass('GameControl')
export class GameControl extends Component
{
    @property({ type: CCInteger })
    public speed: number = 300;

    @property({ type: CCInteger })
    public pipeSpeed: number = 200;

    @property({ type: Ground })
    public ground: Ground = null;

    @property({ type: Result })
    public result: Result = null;

    onLoad()
    {
        this.ground.setSpeed(this.speed);
        this.result.hideResult();
    }

    initListener()
    {

    }

    startGame()
    {

    }
}


