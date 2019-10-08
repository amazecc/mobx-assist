import { Module, register } from "../src";
import { CommonState } from "./type";

const initialState: CommonState = {
    a: 1,

    get b() {
        return this.a * this.a;
    }
};

class Common extends Module<CommonState> {
    async add() {
        this.state.a = ++this.state.a;
    }
}

export const RootModule = register(new Common("Common", initialState));
