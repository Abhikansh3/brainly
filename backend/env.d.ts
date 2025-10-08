// src/env.d.ts
declare namespace NodeJS {
  interface ProcessEnv {
    MOONGO_URL: string;
  }
}
