import { Module, register } from "../src";
import { RootState } from "./type";

const initialState: RootState = {
    a: 1,

    get b() {
        return this.a * this.a;
    }
};

class Root extends Module<RootState> {
    async add() {
        this.state.a = ++this.state.a;
    }
}

export const RootModule = register(new Root(initialState));
