declare global {
  namespace NodeJS {
    type ProcessEnv = {
      readonly PORT: string;
    };
  }
}

export {};
