declare module '#app' {
  interface PageMeta {
    title?: string
    order?: number
    icon?: string
    affix?: boolean
    hideMenu?: boolean
  }
}

declare namespace API {
  interface Result<T = any> {
    code: number
    message: string
    data: T
  }
}

declare global {
  declare interface Fn<T = any, R = T> {
    (...arg: T[]): R;
  }

  declare interface PromiseFn<T = any, R = T> {
    (...arg: T[]): Promise<R>;
  }

  declare type RefType<T> = T | null;

  declare type LabelValueOptions = {
    label: string;
    value: any;
    [key: string]: string | number | boolean;
  }[];

  declare type EmitType = (event: string | any, ...args: any[]) => void;

  // vue
  declare interface ComponentElRef<T extends HTMLElement = HTMLDivElement> {
    $el: T;
  }
  
  declare type ComponentRef<T extends HTMLElement = HTMLDivElement> = ComponentElRef<T> | null;
  
  declare type ElRef<T extends HTMLElement = HTMLDivElement> = Nullable<T>;
  
  declare type VueNode = VNodeChild | JSX.Element;

  export type Writable<T> = {
    -readonly [P in keyof T]: T[P];
  };

  declare type Nullable<T> = T | null;
  declare type NonNullable<T> = T extends null | undefined ? never : T;
  declare type Recordable<T = any> = Record<string, T>;
  declare type ReadonlyRecordable<T = any> = {
    readonly [key: string]: T;
  };
  declare type Indexable<T = any> = {
    [key: string]: T;
  };
  declare type DeepPartial<T> = {
    [P in keyof T]?: DeepPartial<T[P]>;
  };
  declare type TimeoutHandle = ReturnType<typeof setTimeout>;
  declare type IntervalHandle = ReturnType<typeof setInterval>;
}

export { }
