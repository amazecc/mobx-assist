# mobx-assist

### 核心概念

以模块划分整个项目，模块分为 `数据管理` 与 `UI 组件` 两个部分：

- 数据管理部分主要实现模块数据定义，数据修改，异常捕获
- UI 组件部分主要负责将数据渲染为 UI 界面以及调用修改数据的方法

### API

#### Module

类：提供操作模块数据的方法

- **constructor(moduleName: string, initialState: object | (new () => object))**

	- moduleName: 模块名
	- initialState: 初始状态值或者一个类
	
		当 `initialState` 传入的是对象，使用 `observable()` 方法创建 `store`，传入的是类，则通过 `new initialState()` 的方式创建 `store`
	
		```js
		const initialState: State = {
		    a: 1,
		
		    get b() {
		        return this.a * this.a;
		    }
		};
		
		// or
		
		import { observable, computed } from "mobx";
	
		export class State {
		    @observable num: number = 0;
		    @observable list: number[] = [];
		    @observable loading: boolean = false;
		    @computed get listLength() {
		        return this.list.length;
		    }
		}
		```

- **state**

	mobx store，可在组件中获取 store 中的数据并渲染

- **setState**: (data: object | (state: object) => void, actionName?: string) => void

	可批量更新 store 中的数据，UI 将自动刷新
	
	```js
	this.setState({
		name: "",
		age: 10
	}, "更新数据"); // 可指定 actionName，在调试工具中可方便查看
	
	// or
	
	this.setState(state => {
		state.name = "jack";
	}, "更新数据"); // 可指定 actionName，在调试工具中可方便查看

	
	```
	
- **resetState**: (skipFields: string[]) => void

	重置 store 中的数据，默认全部重置，可传入字段数据，跳过这些字段
	
	```js
	this.resetState(["name", "age"]);	 // store 中除去 name，age 两个字段，其他都重置
	```
	
- **globalState**: getter

	可获取所有已注册模块 store 中的数据
	
	```js
	const {name, age} = this.globalState.Demo; // 获取 Demo 模块 store中的数据
	const {name, age} = this.globalState.Common; // 获取 Common 模块 store中的数据	
	```

#### register

方法：(module: T) => T & { \_pure\_: T }

提供异常捕获程序，捕获所有 Module 子类方法的异常信息

`module._pure_` 不含异常捕获程序，一般在其他模块中调用时使用，因为只需要一个异常捕获的过程

#### initialConfig

初始化配置

```js
initialConfig({
  errorHandler(error){
  	console.error(error);
  }, // 全局错误捕获方法
})
```

#### delay


```js
await delay(1000); // 停滞一秒
```

#### loading

辅助装饰器，用于自动管理 `loading` 状态的变化，面向业务

```js
const initialState: State = {
  loading: false
}

class Demo extends Module<State, RootState> {
  // 自动根据 getList 函数的执行情况设置 store 中 loading 字段的值：false -> true -> false
  @loading<State>('loading') 
  async getList() {
    await delay(1000)
    const list = await DemoAPI.getList()
  }
 
}

```

#### asyncDecoratorCreator 、 decoratorCreator

装饰器生成器，便于编写装饰器，用于类方法

`asyncDecoratorCreator` 用于给 `async` 函数编写装饰器，以下是 `loading` 装饰器例子

```js
export function loading<T>(field: keyof T) {
    return asyncDecoratorCreator(async function(this: Module<any>, fn) {
        try {
            this.setState({ [field]: true }, `loading field update: ${field}`);
            return await fn();
        } finally {
            this.setState({ [field]: false }, `loading field update: ${field}`);
        }
    });
}

```

`decoratorCreator` 给普通函数编写装饰器

```js
export function test() {
  return decoratorCreator(fn => {
  	// 前置操作
   	fn();	// 执行原函数
   	// 后置操作
  })
}

```
