import * as React from "react";
import { observer } from "mobx-react";
import { TodoListModule } from "./index";
import { RootModule } from "../../rootState";

@observer
export class TodoList extends React.Component {
    render() {
        return (
            <div>
                <button onClick={() => TodoListModule.push()}>修改</button>
                <button onClick={() => TodoListModule.add()}>打印 root state</button>
                <hr />
                {JSON.stringify(TodoListModule.store, null, 4)}
                {TodoListModule.store.listLength}
                <hr />
                <button onClick={() => RootModule.add()}>添加</button>
                rootState <br />a {RootModule.store.a} <br />b {RootModule.store.b}
            </div>
        );
    }
}
