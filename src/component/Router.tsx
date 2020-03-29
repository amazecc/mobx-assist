import * as React from "react";
import { Router as ReactRouter } from "react-router-dom";
import { createBrowserHistory } from "history";

export const history = createBrowserHistory();

export const Router: React.FC = React.memo(props => <ReactRouter history={history}>{props.children}</ReactRouter>);
