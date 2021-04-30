import { makeAutoObservable } from "mobx";

export class State {
    num: number = 0;
    list: number[] = [];
    loading: boolean = false;
    get listLength() {
        return this.list.length;
    }
    constructor() {
        makeAutoObservable(this);
    }
}
