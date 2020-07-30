import React from 'react';

import styled from 'styled-components';
import { Box, Typography } from '@material-ui/core';
import { Tile } from '@/shared/styled components';

const InfoBlock = styled.div`
    margin: 10px 0;
`;

const ColumnTile = styled(Tile)`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: min-content;
`;

type Props = {
    status: string;
    format: string;
    popularity: string;
    startDate: string;
    endDate: string;
    countryOfOrigin: string;
    duration: number;
};

export const FullTitleInfo: React.FC<Props> = (props) => {
    const {
        endDate,
        startDate,
        format,
        status,
        popularity,
        countryOfOrigin, 
        duration
    } = props;

    return (
        <ColumnTile>
            <InfoBlock>
                <Typography variant='subtitle2'>Status:</Typography>
                {status}
            </InfoBlock>
            <InfoBlock>
                <Typography variant='subtitle2'>Format:</Typography> {format}
            </InfoBlock>
            <InfoBlock>
                <Typography variant='subtitle2'>Start Date:</Typography>
                {startDate}
            </InfoBlock>
            <InfoBlock>
                <Typography variant='subtitle2'>End Date:</Typography> {endDate}
            </InfoBlock>
            <InfoBlock>
                <Typography variant='subtitle2'>Popularity: </Typography>
                {popularity}
            </InfoBlock>
            <InfoBlock>
                <Typography variant='subtitle2'>Origin: </Typography>
                {countryOfOrigin}
            </InfoBlock>
            <InfoBlock>
                <Typography variant='subtitle2'>Duration: </Typography>
                {duration}
            </InfoBlock>
        </ColumnTile>
    );
};
