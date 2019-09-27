import * as React from "react";
import { observer } from "mobx-react";
import { TodoListModule } from "./index";
import { RootModule } from "../../rootState";

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
                <hr />
                <pre>{JSON.stringify(TodoListModule.store, null, 4)}</pre>
                listLenght: {TodoListModule.store.listLength}
                <hr />
                rootState: <br />
                <button onClick={() => RootModule.add()}>添加</button>
                <br />a {RootModule.store.a} <br />b {RootModule.store.b}
            </div>
        );
    }
}
