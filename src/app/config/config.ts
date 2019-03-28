

export interface IConfig {
  api : string;
}

let envs = {
  "development" :  {
    "api" : "https://api.webdiggo.nullabork.dev:39541/api/v1"
  },

  "production" : {
    "api" : "https://api.webdiggo.nullabork.dev:39541/api/v1"
  }
}

export const Config : IConfig = envs.development;
