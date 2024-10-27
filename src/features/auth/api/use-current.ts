import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/rpc"

export const useCurrent = () => {
    const query = useQuery({
        queryKey: ["current"],
        queryFn: async () => {
            const response = await client.api.auth.current["$get"]();
            if(!response.ok){
                return null
            }
            const { data } = await response.json();
            return data
        }
    })
    return query
}




// import { useMutation } from "@tanstack/react-query";
// import { InferRequestType, InferResponseType } from "hono";

// import { client } from "@/lib/rpc";


// type ResponseType = InferResponseType<typeof client.api.auth.current["$get"]>;
// type RequestType = InferRequestType<typeof client.api.auth.current["$get"]>;

// export const useCurrent  = () => {
//     const mutation = useMutation<
//     ResponseType,
//     Error,
//     RequestType
//     >({
//         mutationFn : async () => {
//             const response = await client.api.auth.current["$get"]();
//             return await response.json()
//         }
//     })
//     return mutation
// }
