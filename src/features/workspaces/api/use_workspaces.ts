import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/rpc"

export const useGetWorkspaces = () => {
    const query = useQuery({
        queryKey: ["workspaces"],
        queryFn: async () => {
            const response = await client.api.workspaces.$get();

            if(!response.ok){
                throw new Error("Failed to get workspaces")
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
