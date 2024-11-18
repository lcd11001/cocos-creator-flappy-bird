import { _decorator, Component, Label, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Result')
export class Result extends Component
{
    @property({ type: Label })
    public scoreLabel: Label = null;

    @property({ type: Label })
    public topScoreLabel: Label = null;

    @property({ type: Label })
    public tryAgainLabel: Label = null;

    @property({ type: Label })
    public pressAnyKeyLabel: Label = null;

    maxScore = 0;
    currentScore = 0;

    protected onLoad(): void
    {
        this.hideScore();
        this.hideHighScore();
        this.hideTryAgain();
        this.hidePressAnyKey();
    }

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
        this.topScoreLabel.string = `High score: ${this.maxScore}`;
    }

    showHighScore()
    {
        this.topScoreLabel.node.active = true;
    }

    hideHighScore()
    {
        this.topScoreLabel.node.active = false;
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

    showTryAgain()
    {
        this.tryAgainLabel.node.active = true;
    }

    hideTryAgain()
    {
        this.tryAgainLabel.node.active = false;
    }

    showPressAnyKey()
    {
        this.pressAnyKeyLabel.node.active = true;
    }

    hidePressAnyKey()
    {
        this.pressAnyKeyLabel.node.active = false;
    }

    showResult()
    {
        this.updateHighScore(Math.max(this.maxScore, this.currentScore));

        this.showScore();

        this.showHighScore();
        this.showTryAgain();
    }

    hideResult()
    {
        this.showScore();

        this.hideHighScore();
        this.hideTryAgain();
        this.hidePressAnyKey();
    }
}


