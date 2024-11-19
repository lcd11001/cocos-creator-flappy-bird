import { _decorator, CCInteger, Component, instantiate, Node, NodePool, Prefab } from 'cc';
import { Pipes } from './Pipes';
const { ccclass, property } = _decorator;

@ccclass('PipePool')
export class PipePool extends Component
{
    @property({ type: Prefab, tooltip: 'Pipe Prefab' })
    public pipePrefab: Prefab = null;

    @property({ type: CCInteger, tooltip: 'The number of pipes' })
    public poolSize: number = 5;

    @property({ type: Node, tooltip: 'The pipe pool node' })
    public root: Node = null;

    private pipePool: NodePool = new NodePool('Pipes');

    public initPool()
    {
        for (let i = 0; i < this.poolSize; i++)
        {
            const pipe = this.createPipe();
            this.pipePool.put(pipe);
        }
    }

    createPipe()
    {
        const pipe = instantiate(this.pipePrefab);
        return pipe;
    }

    public getPipe(): Pipes
    {
        if (this.pipePool.size() == 0)
        {
            this.pipePool.put(this.createPipe());
        }

        const node = this.pipePool.get();
        this.root.addChild(node);
        return node.getComponent(Pipes);
    }

    public recyclePipe(pipe: Pipes)
    {
        pipe.node.removeFromParent();
        this.pipePool.put(pipe.node);
    }
}


