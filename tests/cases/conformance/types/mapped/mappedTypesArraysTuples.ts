// @strict: true
// @declaration: true

type Box<T> = { value: T };
type Boxified<T> = { [P in keyof T]: Box<T[P]> };

type T00 = Boxified<[number, string?, ...boolean[]]>;
type T01 = Partial<[number, string?, ...boolean[]]>;
type T02 = Required<[number, string?, ...boolean[]]>;

type T10 = Boxified<string[]>;
type T11 = Partial<string[]>;
type T12 = Required<string[]>;
type T13 = Boxified<ReadonlyArray<string>>;
type T14 = Partial<ReadonlyArray<string>>;
type T15 = Required<ReadonlyArray<string>>;

type T20 = Boxified<(string | undefined)[]>;
type T21 = Partial<(string | undefined)[]>;
type T22 = Required<(string | undefined)[]>;
type T23 = Boxified<ReadonlyArray<string | undefined>>;
type T24 = Partial<ReadonlyArray<string | undefined>>;
type T25 = Required<ReadonlyArray<string | undefined>>;

type T30 = Boxified<Partial<string[]>>;
type T31 = Partial<Boxified<string[]>>;

type A = { a: string };
type B = { b: string };

type T40 = Boxified<A | A[] | ReadonlyArray<A> | [A, B] | string | string[]>;

declare function unboxify<T>(x: Boxified<T>): T;

declare let x10: [Box<number>, Box<string>, ...Box<boolean>[]];
let y10 = unboxify(x10);

declare let x11: Box<number>[];
let y11 = unboxify(x11);

declare let x12: { a: Box<number>, b: Box<string[]> };
let y12 = unboxify(x12);

declare function nonpartial<T>(x: Partial<T>): T;

declare let x20: [number | undefined, string?, ...boolean[]];
let y20 = nonpartial(x20);

declare let x21: (number | undefined)[];
let y21 = nonpartial(x21);

declare let x22: { a: number | undefined, b?: string[] };
let y22 = nonpartial(x22);

type Awaited<T> = T extends PromiseLike<infer U> ? U : T;
type Awaitified<T> = { [P in keyof T]: Awaited<T[P]> };

declare function all<T extends any[]>(...values: T): Promise<Awaitified<T>>;

function f1(a: number, b: Promise<number>, c: string[], d: Promise<string[]>) {
    let x1 = all(a);
    let x2 = all(a, b);
    let x3 = all(a, b, c);
    let x4 = all(a, b, c, d);
}
