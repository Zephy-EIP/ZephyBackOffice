export type BasicResponse = {
    code: number,
    message: string
}

const basicResponseTable: BasicResponse[] = [
    {code: 200, message: "Success"},
    {code: 400, message: "Invalid request"},
    {code: 401, message: "Unauthorized"},
    {code: 403, message: "Forbidden"},
    {code: 404, message: "Not found"},
    {code: 409, message: "Conflict"},
    {code: 422, message: "Unprocessable entity"},
    {code: 500, message: "Internal server error"},
    {code: 502, message: "Not implemented"},
]

export default function createBasicResponse(code: number, customMessage?: string): BasicResponse {
    if (customMessage === undefined)
        for (const resp of basicResponseTable) {
            if (resp.code === code)
                return resp;
        }
    return {code: code, message: customMessage || ""};
}
