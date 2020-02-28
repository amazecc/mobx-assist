import React from "react";
import { observer } from "mobx-react";
import { useStore } from "../../../src";
import { TodoListModule } from "./index";
import { CommonModule } from "../../common";
import { GlobalState } from "demo/globalStateType";

@observer
export class TodoList extends React.Component {
    render() {
        return (
            <div>
                <button onClick={() => TodoListModule.resetState()}>重置所有</button>
                <button onClick={() => TodoListModule.resetState(["num"])}>重置排除 num</button>
                <button onClick={() => TodoListModule.resetState(["list"])}>重置排除 list</button>
                <button onClick={TodoListModule.push}>修改 list</button>
                <button onClick={TodoListModule.add}> 递增 num</button>
                <button onClick={TodoListModule.error}> 触发 error</button>
                <hr />
                <pre>{JSON.stringify(TodoListModule.state, null, 4)}</pre>
                listLength: {TodoListModule.state.listLength}
                <hr />
                rootState: <br />
                <button onClick={() => CommonModule.add()}>添加</button>
                <br />a {CommonModule.state.a} <br />b {CommonModule.state.b} <br />
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
