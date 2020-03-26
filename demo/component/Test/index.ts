import { Module, loading, delay, register } from "../../../src";
import { State } from "./state";
import { TodoListDemo } from "./component";

class TodoList extends Module<State> {
    a = 0;

    componentDidMount() {
        console.log("组件加载");
    }

    componentDidHide() {}

    componentDidShow() {}

    componentWillMount() {}

    componentWillUnmount() {}

    async push() {
        this.setState(state => state.list.push(++this.a), "push list");
    }

    @loading<State>("loading")
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

const module = register(new TodoList(State));
export const todoListModule = module.getModule();
export const TodoListDemoComponent = module.attachLifecycle(TodoListDemo);
