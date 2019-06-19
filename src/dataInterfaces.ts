export interface Config {
  authorityUrl: string;
  resourceUrl: string;
  apiUrl: string;
  appId: string;
  workspaceId: string;
  reportId: string;
  username: string;
  password: string;
}

export interface PowerBIClient{
  powerbi: any; //TODO type
  models: any; //TODO type
}