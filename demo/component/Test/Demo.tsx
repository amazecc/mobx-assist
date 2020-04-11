import * as React from "react";
import { observer } from "mobx-react";
import { connect, Store } from "../../../src";
import { State } from "./state";

interface StateProps {
    todo: State;
    num: number
}

export interface DemoProps extends StateProps {
    text: string;
}

@observer
export class DemoBase extends React.PureComponent<DemoProps> {
    render() {
        const { text, num } = this.props;
        return (
            <div>
                <strong>Demo1 class component</strong> <br />
                输入文字：{text} <br /> store 中的数字：{num}
            </div>
        );
    }
}

const mapStateToProps = (state: Store): StateProps => {
    return {
        todo: state.TodoList,
        num: state.TodoList.num
    };
};

export const Demo = connect(mapStateToProps)(DemoBase);

export const Demo2 = connect(mapStateToProps)(
    observer((props: DemoProps) => {
        return (
            <div>
                <strong>Demo2 function component</strong> <br />
                输入文字：{props.text} <br /> store 中的数字：{props.todo.num}
            </div>
        );
    })
);
