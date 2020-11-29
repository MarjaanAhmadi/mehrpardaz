import useSWR, { mutate } from "swr";

// import { MasterApiWithOptions } from "API";
import { useMaterApiWithOptions } from "hooks/useMasterApi";

export default function useRequest(request, { initialData, ...config } = {}) {
  const key = request && JSON.stringify(request);
  // console.log("useRequest -> key", key);
  const MasterApiWithOptions = useMaterApiWithOptions();
  const { data: response, error, isValidating, mutate } = useSWR(
    key,
    () => request && MasterApiWithOptions(request),
    {
      suspense: true,
      revalidateOnFocus: false,
      ...config,
      initialData: initialData && {
        status: 200,
        statusText: "InitialData",
        headers: {},
        data: initialData,
      },
    }
  );

  return {
    data: response && response.data,
    response,
    error,
    isValidating,
    mutate,
  };
}
export function useRequestWithPage(request, { initialData, ...config } = {}) {
  const MasterApiWithOptions = useMaterApiWithOptions();
  const { data: response, error, isValidating, mutate } = useSWR(
    request && JSON.stringify(request),
    () => request && MasterApiWithOptions(request),
    {
      suspense: true,
      revalidateOnFocus: false,
      ...config,
      initialData: initialData && {
        status: 200,
        statusText: "InitialData",
        headers: {},
        data: initialData,
      },
    }
  );

  return {
    data: response && response.data,
    response,
    error,
    isValidating,
    mutate,
  };
}

export function mutationSwr(request) {
  const key = request && JSON.stringify(request);
  mutate(key);
  return "";
}
