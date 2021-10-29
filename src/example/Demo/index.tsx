import React from "react";
import { observer } from "mobx-react";
import { attachLifecycle, connect, GlobalState } from "../../resource";
import { demoModule } from "./Module";

interface DemoProps {
    globalState: GlobalState;
}

@observer
export class Demo extends React.Component<DemoProps> {
    override render() {
        return (
            <div>
                <button onClick={() => demoModule.resetState()}>重置所有</button>
                <button onClick={() => demoModule.resetState(["num"])}>重置排除 num</button>
                <button onClick={() => demoModule.resetState(["list"])}>重置排除 list</button>
                <button onClick={demoModule.push}>修改 list</button>
                <button onClick={demoModule.add}> 递增 num</button>
                <hr />
                <pre>{JSON.stringify(this.props.globalState, null, 4)}</pre>
            </div>
        );
    }
}

export default attachLifecycle(demoModule, connect(globalState => ({ globalState }))(Demo));
