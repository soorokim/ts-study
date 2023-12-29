// type SuccessResponse = {
//     isSuccess: true,
//     data: {id: number}
// }

// type FetchingResponse = {
//     isSuccess: false,
//     isFetching: true
// }

// type QueryResponse = SuccessResponse | FetchingResponse

// const test = (response:QueryResponse) => {
//     console.log(response.data) // Error: Property 'data' does not exist on type 'QueryResponse'.
//                                // Property 'data' does not exist on type 'FetchingResponse'.
//     if(response.isSuccess) {
//         console.log(response.data)
//     }
// }

type ApiResponseBase = {
  code: number;
  message: string;
};

type ListApiResponse<T> = ApiResponseBase & {
  data: T[];
};

type DataApiResponse<T> = ApiResponseBase & {
  data: T;
};

class ResponseError {
  code: number;
  message: string;
}

class JSSyntaxError {
  position: {
    line: number;
    col: number;
  };
  message: string;
}

function printError(error: ResponseError | JSSyntaxError) {
  if (error instanceof ResponseError) {
    console.log(error.code, error.message);
    return;
  }
  console.log(error.position.line, error.position.col, error.message);
}

type Car = {
  while: number;
  door: number;
  window: number;
  hasSunRoof: boolean;
};

type Boat = {
  engine: string;
  speed: number;
  torque: number;
  size: "BIG" | "SMALL";
};

function printVehicle(vehicle: Car | Boat) {
  if ("while" in vehicle) {
    console.log(
      `나는 자동차를 갖고있어! 바퀴는 ${vehicle.while}개야 내차의 문 개수는 ${vehicle.window}개`
    );
    return;
  }

  console.log(
    `나는 보트를 갖고 있어! 내 보트의 엔진은 ${vehicle.engine}이고 최대 토트는 ${vehicle.torque}토크야!`
  );
}

type TablePagination = {
  limit: number;
  page: number;
};

type SearchFilter = {
  id: number;
  name: string;
  phoneNumber: string;
  nickname: string;
};

type ApiResponseParams = TablePagination & Partial<SearchFilter>;

type ApiResponse<T> = {
  code: number;
  message: string;
  data: T;
};

class DataList<T> {
  counter: T[];

  constructor(data: T) {
    this.counter = [data];
  }

  push(data: T) {
    this.counter.push(data);
  }
}

const dataList = <T>(input: T) => {
  const list = [input];
  return {
    push: (input: T) => list.push(input),
  };
};

const list = dataList({ test: 1 });

list.push({ test: 2 });

// list.push(1);

type GenericList<T extends Number> = T[];

const oneList: GenericList<1> = [1, 1, 1, 1, 1, 1];
const numberList: GenericList<Number> = [1, 2, 3, 4, 5, 6];
// const stringList: GenericList<String> = [];

type Toast = {
  source: boolean;
  vegetable: boolean;
  bread: boolean;
  option: Partial<Option>;
};

type Option = {
  ham: boolean;
  cheese: boolean;
  egg: boolean;
};

const makeToast = (ingredients: Toast) => {
  let toast = ["toast"];
  if (ingredients.bread && ingredients.source && ingredients.vegetable) {
    return "fail";
  }

  if (ingredients.option.ham) {
    toast = ["ham", ...toast];
  }
  if (ingredients.option.egg) {
    toast = ["egg", ...toast];
  }
  if (ingredients.option.cheese) {
    toast = ["cheese", ...toast];
  }

  return toast.join(" ");
};

let readonlyTest: Readonly<{ member: number }> = { member: 1 };

// readonlyTest.member = 1;

const recordTest: Record<string, number> = {
  zero: 0,
};

const recordTest2: Record<number, string> = {
  0: "zero",
};

const option: Pick<Toast, "option"> = { option: { cheese: true } };

const require: Omit<Toast, "option"> = {
  source: true,
  bread: true,
  vegetable: true,
};

const exclude: Exclude<keyof Toast, "source"> = "bread";

const testFn = (input1: number, input2: string) => input1 + input2;
type Params = Parameters<typeof testFn>;
const params: Params = [0, "hi"];

// type T0 = ConstructorParameters<Promise<number>>;

type Return = ReturnType<typeof testFn>;

type RichToast = Required<Toast>;

const aObject = {
  a: 1,
  b: 2,
  c: 3,
};

// type RecordType = Record<keyof typeof aObject, number> & { zzzz: string };
// type IndexSignature = {
//   [key in keyof typeof aObject]: number;
// };

// type RecordType = Record<string, number>;
// type IndexSignature = {
//   [key: string]: number;
// };

type TestA = number[];
type TestA2 = Array<number>;

// type Teee<T> = {
//   test: T;
// };

// interface Tesst extends Teee<number> {}

type A = {
  [key in string]: number | string;
};

const aa: A = {
  age: 0,
};

aa.email = "test";

const numberArray = [1, 2, 3, 4, 5, 6, 7] as const;

type Indexed = (typeof numberArray)[number];

// const test = 1;
const test = "hi";

type TestType = typeof test;

const test1 = { key: "alt", id: 10 } as const;

type Test1Type = typeof test1;

const msgbox = (msg: string) => msg;
// type MsgBoxReturnType =  typeof msgbox("Are you sure you want to continue?")

type Getters<Type> = {
  [Property in keyof Type as `get${Capitalize<
    string & Property
  >}`]: () => Type[Property];
};

interface Person {
  name: string;
  age: number;
  location: string;
}

type LazyPerson = Getters<Person>;
