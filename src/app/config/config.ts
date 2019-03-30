

export interface IConfig {
  api : string;
  pager : {
    count : number;
    offset : number;
  }
}

let envs = {
  "development" :  {
    "api" : "https://api.webdiggo.nullabork.dev/api/v1",
    "pager" : {
      "count" : 20,
      "offset" : 0
    }
  },

  "production" : {
    "api" : "https://api.webdiggo.nullabork.dev/api/v1",
    "pager" : {
      "count" : 20,
      "offset" : 0
    }
  }
}

export const Config : IConfig = envs.development;
