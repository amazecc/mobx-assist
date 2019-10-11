import { observable, computed } from "mobx";

export class State {
    @observable num: number = 0;
    @observable list: number[] = [];
    @observable loading: boolean = false;
    @computed get listLength() {
        return this.list.length;
    }
}
