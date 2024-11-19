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

        // console.log('fly jumpHeight', this.jumpHeight, 'jumpDuration', this.jumpDuration);

        this.animation.stop();


        // working
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


        /*
        // working
        tween(this.location)
            .by(this.jumpDuration,
                {
                    y: this.jumpHeight
                },
                {
                    easing: 'smooth',
                    onUpdate: (target: Vec3, ratio: number) =>
                    {
                        console.log('onUpdate', target, 'ratio', ratio, 'before', this.node.position);
                        this.node.setPosition(target);
                        console.log('onUpdate', target, 'ratio', ratio, 'after', this.node.position);
                    },
                }
            )
            .start();
        */

        /*
        // not working
        tween(this.node.position)
            .by(this.jumpDuration,
                {
                    y: this.jumpHeight
                },
                {
                    easing: 'smooth',
                    onUpdate: (target: Vec3, ratio: number) =>
                    {
                        console.log('onUpdate', target, 'ratio', ratio, 'before', this.node.position);
                        this.node.setPosition(target);
                        console.log('onUpdate', target, 'ratio', ratio, 'after', this.node.position);
                    }
                }
            )
            .start();
        */

        this.animation.play();
    }
}


