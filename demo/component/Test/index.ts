import { Module, Loading, delay, attachLifecycle } from "../../../src";
import { State } from "./state";
import { TodoListDemo } from "./component";

class TodoList extends Module<State> {
    a = 0;

    onDidMount() {
        console.log("组件加载");
    }

    onWillUnmount() {
        return ["loading" as const];
    }

    async push() {
        this.setState(state => state.list.push(++this.a), "push list");
    }

    @Loading<State>("loading")
    async add() {
        await delay(1000);
        const { num } = this.state;
        this.setState({ num: num + 1 }, "add num");
        console.log("==> rootState", this.globalState.Common.a);
    }

    async error() {
        throw new Error("error throw");
    }
}

export const todoListModule = new TodoList(State);
export const TodoListDemoComponent = attachLifecycle(todoListModule, TodoListDemo);
