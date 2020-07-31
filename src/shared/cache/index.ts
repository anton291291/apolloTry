import { InMemoryCache } from '@apollo/client';
import { makeVar } from '@apollo/client';

export const searchVar = makeVar<{
    searchInputValue: string;
    isLoading: boolean;
}>({
    searchInputValue: null,
    isLoading: false
});

export const genreFilterVar = makeVar<{ genresValues: Array<any> }>({
    genresValues: []
});

export const cache: InMemoryCache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                search: {
                    read() {
                        return searchVar();
                    }
                },
                filters: {
                    read() {
                        return genreFilterVar();
                    }
                }
            }
        }
    }
});
