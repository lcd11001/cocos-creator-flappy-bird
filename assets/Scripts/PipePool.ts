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
        // console.log('init pipe pool');
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
            console.warn('pipe pool is empty, create new pipe');
        }

        // 'reuse' callback method will be invoked
        const node = this.pipePool.get();
        // console.log('get pipe', node.uuid);
        this.root.addChild(node);
        return node.getComponent(Pipes);
    }

    public recyclePipe(pipe: Pipes)
    {
        // console.log('recycle pipe', pipe.node.uuid);
        pipe.node.removeFromParent();

        // 'unuse' callback method will be invoked
        this.pipePool.put(pipe.node);
    }
}


