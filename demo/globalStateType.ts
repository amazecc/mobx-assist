import { CommonState } from "./type";
import { State as TodoListState } from "./component/Test/state";

export interface GlobalState {
    Common: CommonState;
    TodoList: TodoListState;
}
