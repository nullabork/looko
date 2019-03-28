

export interface IConfig {
  api : string;
}

let envs = {
  "development" :  {
    "api" : "https://115.70.110.212:39541/api/v1"
  },

  "production" : {
    "api" : "https://115.70.110.212:39541/api/v1"
  }
}

export const Config : IConfig = envs.development;
