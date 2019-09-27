import { isDevelopment } from "./common";

interface Config {
    errorHandler: (error: any) => void;
    rootStore: object;
}

export const config: Config = {
    errorHandler(error: any) {
        if (isDevelopment()) {
            console.error(`[[ saga-assist caught exception ]]:\n`, error);
        } else {
            throw error;
        }
    },
    rootStore: {}
};

export const initialConfig = (options: Config) => Object.assign(config, options);
