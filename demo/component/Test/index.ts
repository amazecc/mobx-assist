import { Module, loading, delay, register } from "../../../src";
import { GlobalState } from "demo/globalStateType";
import { State } from "./state";

class TodoList extends Module<State, GlobalState> {
    a = 0;

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

export const TodoListModule = register(new TodoList(State));
