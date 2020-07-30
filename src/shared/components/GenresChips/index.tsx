import React from 'react';

import styled from 'styled-components';
import { StyledChip } from '@/shared/styled components';

type Props = {
    genres: Array<string>;
};

const genresColors = {
    Action: '#d64161',
    Adventure: '#6b5b95',
    Comedy: '#feb236',
    Drama: '#ff7b25',
    Ecchi: '#b5e7a0',
    Fantasy: '#405d27',
    Hentai: '#ffef96',
    Horror: '#50394c',
    'Mahou Shoujo': '#f4e1d2',
    Mecha: ' #618685',
    Music: '#f18973',
    Mystery: '#4040a1',
    Psychological: '#96897f',
    Romance: '#484f4f',
    'Sci-Fi': '#d4ac6e',
    'Slice of Life': '#87bdd8',
    Sports: '#667292',
    Supernatural: '#034f84',
    Thriller: '#bc5a45'
};

export const GenresChips: React.FC<Props> = (props) => {
    const { genres } = props;

    return (
        <>
            {genres.map((item) => (
                <StyledChip label={item} bColor={genresColors[item]} />
            ))}
        </>
    );
};
