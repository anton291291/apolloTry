import { InMemoryCache } from '@apollo/client';
import { makeVar } from '@apollo/client';

export const searchVar = makeVar<{ searchInputValue: string }>({
    searchInputValue: null
});

export const cache: InMemoryCache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                search: {
                    read() {
                        return searchVar();
                    }
                }
            }
        }
    }
});
