import { Module, loading, delay, register } from "../../../src";
import { RootState } from "../../type";
import { State } from "./type";

const initialState: State = {
    list: [],
    loading: false,

    get listLength() {
        return this.list.length;
    }
};

class TodoList extends Module<State, RootState> {
    a = 0;

    @loading<State>("loading")
    async push() {
        await delay(1000);
        this.state.list.push(this.a++);
        await this.error();
        console.log("==> 错误下一行");
    }

    add() {
        console.log("==> rootState", this.rootState);
    }

    async error() {
        throw new Error("error throw");
    }
}

export const TodoListModule = register(new TodoList(initialState));
