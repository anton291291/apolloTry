import { useLazyQuery } from '@apollo/client';
import { genresOptions } from '@/features/Header/GenreSelect';

const [makeSearch, { data, loading, fetchMore }] = useLazyQuery();

export type FetchMoreType = typeof fetchMore;

export type GenresValuesType = typeof genresOptions;

export type SearchType = {
    searchInputValue: string;
    isLoading: boolean;
};
