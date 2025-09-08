import { _decorator, CCFloat, Component, Node, Vec3, Animation, tween, director, Collider2D, Contact2DType, IPhysics2DContact, RigidBody2D, Vec2 } from 'cc';
import { GameControlBase } from './GameControlBase';
const { ccclass, property } = _decorator;

@ccclass('Bird')
export class Bird extends Component
{

    @property({ type: CCFloat, tooltip: 'how high can they fly' })
    public jumpHeight: number = 0;

    @property({ type: CCFloat, tooltip: 'how long can they fly' })
    public jumpDuration: number = 0;

    @property({ type: GameControlBase })
    public gameControl: GameControlBase = null;

    private animation: Animation = null;
    private location: Vec3 = new Vec3(0, 0, 0);
    private collider: Collider2D = null;
    private rigidBody: RigidBody2D = null;

    onLoad()
    {
        this.animation = this.node.getComponent(Animation);
        this.rigidBody = this.node.getComponent(RigidBody2D);
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

        // Reset rotation
        this.node.setRotationFromEuler(0, 0, 0);

        // If using a Rigidbody2D, reset its physics properties (add this if applicable)
        this.rigidBody.linearVelocity = new Vec2(0, 0);
        this.rigidBody.angularVelocity = 0;
        this.rigidBody.wakeUp();

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


