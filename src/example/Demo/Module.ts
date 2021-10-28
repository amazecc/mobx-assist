import { Module, Loading, delay, bindThis } from "../../resource";
import { State } from "./state";

class DemoModule extends Module<State> {
    a = 0;

    override onDidMount() {
        console.log("组件加载");
    }

    override onWillUnmount() {
        return [];
    }

    async push() {
        this.setState(state => state.list.push(++this.a), "push list");
    }

    @Loading("loading")
    async add() {
        await delay(1000);
        const { num } = this.state;
        this.setState({ num: num + 1 }, "add num");
    }
}

export const demoModule = bindThis(new DemoModule("demoModule", State));
