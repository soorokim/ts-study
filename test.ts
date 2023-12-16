
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
    code: number,
    message: string,
}

type ListApiResponse<T> = ApiResponseBase & {
    data: T[]
}

type DataApiResponse<T> = ApiResponseBase & {
    data: T
}

class ResponseError {
    code: number;
    message: string;
}

class JSSyntaxError {
    position: {
        line: number;
        col: number;
    };
    message: string
}

function printError(error: ResponseError | JSSyntaxError) {
    if(error instanceof ResponseError)  {
        console.log(error.code, error.message)
        return
    }
    console.log(error.position.line, error.position.col, error.message)
}

type Car = {
    whill: number
    door: number
    window: number
    hasSunRoof: boolean
}

type Boat = {
    engine: string
    speed: number
    torque: number
    size: 'BIG' | 'SMALL'
}

function printVehicle(vehicle: Car|Boat){
    if('whill' in vehicle) {
        console.log(`나는 자동차를 갖고있어! 바퀴는 ${vehicle.whill}개야 내차의 문 개수는 ${vehicle.window}개`)
        return
    }

    console.log(`나는 보트를 갖고 있어! 내 보트의 엔진은 ${vehicle.engine}이고 최대 토트는 ${vehicle.torque}토크야!`)
}

type TablePagination = {
    limit: number,
    page: number,
}

type SearchFilter = {
    id: number,
    name: string,
    phoneNumber: string,
    nickname: string
}

type ApiResponseParams = TablePagination & Partial<SearchFilter>