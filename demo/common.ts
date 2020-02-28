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
        this.setState(state => {
            state.a = ++state.a;
        }, "add root a");
    }
}

export const CommonModule = register(new Common(initialState));
