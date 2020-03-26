import { CommonState } from "./type";
import { State as TodoListState } from "./component/Test/state";

declare module "../src" {
    export interface Store {
        Common: CommonState;
        TodoList: TodoListState;
    }
}
