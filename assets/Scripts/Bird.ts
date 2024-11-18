import { _decorator, CCFloat, Component, Node, Vec3, Animation, tween, director } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Bird')
export class Bird extends Component
{

    @property({ type: CCFloat, tooltip: 'how high can they fly' })
    public jumpHeight: number = 0;

    @property({ type: CCFloat, tooltip: 'how long can they fly' })
    public jumpDuration: number = 0;

    private animation: Animation = null;
    private location: Vec3 = new Vec3(0, 0, 0);

    onLoad()
    {
        this.resetBird();
        this.animation = this.node.getComponent(Animation);
    }

    resetBird()
    {
        this.location = new Vec3(0, 0, 0);
        this.node.setPosition(this.location);
    }

    fly()
    {
        if (director.isPaused())
        {
            console.warn('Game is paused');
            return;
        }

        console.log('fly jumpHeight', this.jumpHeight, 'jumpDuration', this.jumpDuration);

        this.animation.stop();

        tween(this.node)
            .by(this.jumpDuration,
                {
                    position: new Vec3(0, this.jumpHeight, 0)
                },
                {
                    easing: 'smooth'
                }
            )
            .start();
        this.animation.play();
    }
}


