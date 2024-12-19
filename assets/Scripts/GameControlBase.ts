import { _decorator, Component, Node } from 'cc';
import { Pipes } from './Pipes';
const { ccclass, property } = _decorator;

@ccclass('GameControlBase')
export abstract class GameControlBase extends Component
{
    abstract initGame(): void;
    abstract resetGame(): void;
    abstract gameOver(): void;
    abstract startGame(): void;
    abstract passPipe(pipe: Pipes);
    abstract get PipeSpeed(): number;
}


