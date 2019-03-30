

export interface IConfig {
  api : string;
  pager : {
    count : number;
    offset : number;
  }
}

let envs = {
  "development" :  {
    "api" : "https://115.70.110.212:39541/api/v1",
    "pager" : {
      "count" : 20,
      "offset" : 0
    }
  },

  "production" : {
    "api" : "https://115.70.110.212:39541/api/v1",
    "pager" : {
      "count" : 20,
      "offset" : 0
    }
  }
}

export const Config : IConfig = envs.development;
