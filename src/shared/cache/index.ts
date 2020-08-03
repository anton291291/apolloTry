import { InMemoryCache } from '@apollo/client';
import { makeVar } from '@apollo/client';
import { GenresValuesType, SearchType } from '../types';

export const searchVar = makeVar<SearchType>({
    searchInputValue: null,
    isLoading: false
});

export const genreFilterVar = makeVar<{
    genresValues: GenresValuesType | Array<any>;
}>({
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
