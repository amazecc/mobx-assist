import type { State as DemoModuleState } from "./Demo/state";

declare module "src/resource" {
    export interface Store {
        demoModule: DemoModuleState;
    }
}
