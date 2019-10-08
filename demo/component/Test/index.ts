import { Module, loading, register, delay } from "../../../src";
import { State } from "./type";
import { GlobalState } from "demo/globalStateType";

const initialState: State = {
    num: 0,
    list: [],
    loading: false,

    get listLength() {
        return this.list.length;
    }
};

class TodoList extends Module<State, GlobalState> {
    a = 0;

    async push() {
        this.state.list.push(this.a++);
        await this.error();
        console.log("==> 错误下一行");
    }

    @loading<State>("loading")
    async add() {
        await delay(1000);
        this.state.num = ++this.state.num;
        console.log("==> rootState", this.globalState.Common.a);
    }

    async error() {
        throw new Error("error throw");
    }
}

export const TodoListModule = register(new TodoList("TodoList", initialState));
