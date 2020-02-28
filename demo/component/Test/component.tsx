import React from "react";
import { observer } from "mobx-react";
import { useStore } from "../../../src";
import { todoListModule } from "./index";
import { commonModule } from "../../common";
import { GlobalState } from "demo/globalStateType";

interface TodoListDemoProps {
    a: number;
}

@observer
export class TodoListDemo extends React.Component<TodoListDemoProps> {
    render() {
        return (
            <div>
                <button onClick={() => todoListModule.resetState()}>重置所有</button>
                <button onClick={() => todoListModule.resetState(["num"])}>重置排除 num</button>
                <button onClick={() => todoListModule.resetState(["list"])}>重置排除 list</button>
                <button onClick={todoListModule.push}>修改 list</button>
                <button onClick={todoListModule.add}> 递增 num</button>
                <button onClick={todoListModule.error}> 触发 error</button>
                <hr />
                <pre>{JSON.stringify(todoListModule.state, null, 4)}</pre>
                listLength: {todoListModule.state.listLength}
                <hr />
                rootState: <br />
                <button onClick={() => commonModule.add()}>添加</button>
                <br />a {commonModule.state.a} <br />b {commonModule.state.b} <br />
                <hr />
                <div>以下通过 hook 获取 store 的值</div>
                <FunctionComponentDemo />
            </div>
        );
    }
}

const FunctionComponentDemo: React.FC = observer(() => {
    const data = useStore((state: GlobalState) => state);
    return <pre>{JSON.stringify(data, null, 4)}</pre>;
});
