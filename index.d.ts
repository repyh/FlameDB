declare module 'fire.db' {
  export class FireDB {
    public authenticate(serviceAccount: string): void;
    public update(path: string, data: Object): Promise<void>;
    public set(path: string, data: Object): Promise<void>;
    public new(path: string, data: Object): Promise<void>;
    public push(path: string, data: Object): Promise<void>;
    public get(path: string): Promise<Data>;
  }

  export type Data = Object<string, any>;
}