import { useState } from "react";
const useAxiosHandler = () => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const useAxios = (
        api: any,
        method: any,
        url: any,
        data: any = null,
        config: any = null
    ) => {
        const axiosData = async () => {
            setIsLoading(true);
            try {
                api[method](url, data)
                    .then((resData: any) => {
                        setResponse(resData.data);
                        setIsLoading(false);
                    })
                    .catch((err: any) => {
                        setError(err.response.data);
                        setIsLoading(false);
                    });
            } catch (err) {
                setError(err);
                setIsLoading(false);
            }
        };
        axiosData();
    };

    return { response, error, useAxios, isLoading };
};

export default useAxiosHandler;