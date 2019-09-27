export const delay = (d: number = 300) => new Promise(resolve => setTimeout(resolve, d));

export const isDevelopment = () => process && process.env && process.env.NODE_ENV === "development";
