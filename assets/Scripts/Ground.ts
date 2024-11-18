import { _decorator, Component, Node, UITransform, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Ground')
export class Ground extends Component
{
    @property({ type: Node, tooltip: 'Ground 1 asset' })
    public ground1: Node = null;

    @property({ type: Node, tooltip: 'Ground 2 asset' })
    public ground2: Node = null;

    @property({ type: Node, tooltip: 'Ground 3 asset' })
    public ground3: Node = null;


    @property({ tooltip: 'Game speed' })
    public gameSpeed: number = 50;

    private groundWidth = 0;

    protected onLoad(): void
    {
        this.startLocation();
    }

    startLocation()
    {
        this.groundWidth = this.ground1.getComponent(UITransform).width;

        this.ground1.setPosition(new Vec3(0, 0, 0));
        this.ground2.setPosition(new Vec3(this.groundWidth, 0, 0));
        this.ground3.setPosition(new Vec3(this.groundWidth * 2, 0, 0));
    }

    moveGround(node: Node, deltaTime: number)
    {
        let x = node.position.x;
        let distance = this.gameSpeed * deltaTime;
        x -= distance;
        node.setPosition(new Vec3(x, node.position.y, node.position.z));

        return distance;
    }

    isOutOfScreen(node: Node)
    {
        if (node.position.x < -this.groundWidth)
        {
            return true;
        }
        return false;
    }

    resetGround(node: Node, tempStartLocation: Vec3)
    {
        node.setPosition(tempStartLocation);
    }

    updateGround(curNode: Node, deltaTime: number, lastNode: Node)
    {
        let distance = this.moveGround(curNode, deltaTime);
        if (this.isOutOfScreen(curNode))
        {
            // because the last node will move to the left with the same speed
            // so that we need to subtract the distance from the last node
            // to fix the gap between the last node and the current node
            this.resetGround(curNode, new Vec3(lastNode.position.x + this.groundWidth - distance, 0, 0));
        }
    }

    update(deltaTime: number)
    {
        this.updateGround(this.ground3, deltaTime, this.ground2);
        this.updateGround(this.ground2, deltaTime, this.ground1);
        this.updateGround(this.ground1, deltaTime, this.ground3);
    }
}


