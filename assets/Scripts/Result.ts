import { _decorator, Component, Label, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Result')
export class Result extends Component
{
    @property({ type: Label })
    public scoreLabel: Label = null;

    @property({ type: Label })
    public highScoreLabel: Label = null;

    @property({ type: Label })
    public resultEnd: Label = null;

    maxScore = 0;
    currentScore = 0;

    updateScore(num: number)
    {
        this.currentScore = num;
        this.scoreLabel.string = this.currentScore.toString();
    }

    showScore()
    {
        this.scoreLabel.node.active = true;
    }

    hideScore()
    {
        this.scoreLabel.node.active = false;
    }

    updateHighScore(num: number)
    {
        this.maxScore = num;
        this.highScoreLabel.string = `High score: ${this.maxScore}`;
    }

    showHighScore()
    {
        this.highScoreLabel.node.active = true;
    }

    hideHighScore()
    {
        this.highScoreLabel.node.active = false;
    }

    resetScore()
    {
        this.updateScore(0);

        this.hideResult();
    }

    addScore()
    {
        this.updateScore(this.currentScore + 1);
    }

    showResult()
    {
        this.updateHighScore(Math.max(this.maxScore, this.currentScore));

        this.showScore();
        this.showHighScore();
        this.resultEnd.node.active = true;
    }

    hideResult()
    {
        this.hideScore();
        this.hideHighScore();
        this.resultEnd.node.active = false;
    }
}


