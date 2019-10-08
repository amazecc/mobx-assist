import { CommonState } from "./type";
import { State as TodoListState } from "./component/Test/type";

export interface GlobalState {
    Common: CommonState;
    TodoList: TodoListState;
}
