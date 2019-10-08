import { isDevelopment } from "./common";

interface Config {
    errorHandler: (error: any) => void;
}

export const config: Config = {
    errorHandler(error: any) {
        if (isDevelopment()) {
            console.error(`[[ saga-assist caught exception ]]:\n`, error);
        } else {
            throw error;
        }
    }
};

export const initialConfig = (options: Config) => Object.assign(config, options);
