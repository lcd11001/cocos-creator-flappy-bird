import { _decorator, CCFloat, Component, Node, Vec3, Animation, tween, director, Collider2D, Contact2DType, IPhysics2DContact } from 'cc';
import { GameControl } from './GameControl';
const { ccclass, property } = _decorator;

@ccclass('Bird')
export class Bird extends Component
{

    @property({ type: CCFloat, tooltip: 'how high can they fly' })
    public jumpHeight: number = 0;

    @property({ type: CCFloat, tooltip: 'how long can they fly' })
    public jumpDuration: number = 0;

    @property({ type: GameControl })
    public gameControl: GameControl = null;

    private animation: Animation = null;
    private location: Vec3 = new Vec3(0, 0, 0);
    private collider: Collider2D = null;

    onLoad()
    {
        this.animation = this.node.getComponent(Animation);
        this.collider = this.node.getComponent(Collider2D);
        this.collider.on(Contact2DType.BEGIN_CONTACT, this.onCollisionEnter, this);

        this.resetBird();
    }

    onCollisionEnter(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null)
    {
        console.log('onCollisionEnter self', selfCollider.node.name);
        console.log('other', otherCollider.node.name);
        if (contact)
        {
            console.log('contact', contact);
        }
        this.gameControl.gameOver();
    }

    resetBird()
    {
        this.location = new Vec3(0, 0, 0);
        this.node.setPosition(this.location);

        // Reset the collider by disabling and re-enabling it
        this.collider.enabled = false;
        this.collider.enabled = true;
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


