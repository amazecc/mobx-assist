import { observable, observe, IObjectDidChange, runInAction } from "mobx";

// TODO: refactor

class ExceptionUtil {
    @observable.shallow private exception: { info: any[] } = {
        info: []
    };

    constructor() {
        observe(this.exception, this.changeListener);
    }

    private changeListener = (change: IObjectDidChange) => {
        if (change.type === "update") {
            this.errorHandler(change.newValue[change.newValue.length - 1]);
        }
    };

    /**
     * 默认异常捕获函数
     */
    private errorHandler = (error: any) => {
        console.error(`Please set global exception catching function via exceptionUtil.setErrorHandlerMethod\n[[ mobx-assist caught exception ]]:\n`, error);
    };

    /**
     * 重新设置异常捕获函数
     */
    setErrorHandlerMethod(fn: (error: any) => void) {
        this.errorHandler = fn;
    }

    /**
     * 获取捕获的所有异常
     */
    getAllException() {
        return this.exception.info;
    }

    /**
     * 用于手动捕获异常，特别适用无法抛出到顶层的异常
     */
    catch(exception: any) {
        runInAction(() => {
            this.exception.info = this.exception.info.concat(exception);
        });
    }
}

export const exceptionUtil = new ExceptionUtil();
