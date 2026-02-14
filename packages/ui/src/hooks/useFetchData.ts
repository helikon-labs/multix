import { HTTP_GRAPHQL_URL } from '../constants';
import { useNetwork } from '../contexts/NetworkContext';

export const useFetchData = <TData, TVariables>(
    query: string,
    options?: RequestInit['headers'],
): ((variables?: TVariables) => Promise<TData>) => {
    // it is safe to call React Hooks here.
    const { selectedNetworkInfo } = useNetwork();

    return async (variables?: TVariables) => {
        const res = await fetch(selectedNetworkInfo?.httpGraphqlUrl || HTTP_GRAPHQL_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...options,
            },
            body: JSON.stringify({
                query,
                variables,
            }),
        });

        const json = await res.json();

        if (json.errors) {
            const { message } = json.errors[0] || {};
            throw new Error(message || 'Error…');
        }

        return json.data;
    };
};
