import React from 'react';

import styled from 'styled-components';
import { StyledChip } from '@/shared/styled components';
import { Avatar } from '@material-ui/core';

const Chip = styled(StyledChip)`
    margin-left: auto;
`;

type Props = {
    ratingData: number;
};

export const RatingChip: React.FC<Props> = (props) => {
    const { ratingData } = props;

    return (
        <>
            {ratingData <= 40 && (
                <Chip
                    avatar={<Avatar>{ratingData}</Avatar>}
                    label='Rating'
                    bColor='red'
                />
            )}
            {ratingData < 65 && ratingData > 40 && (
                <Chip
                    avatar={<Avatar>{ratingData}</Avatar>}
                    label='Rating'
                    bColor='gold'
                />
            )}
            {ratingData >= 65 && ratingData < 80 && (
                <Chip
                    avatar={<Avatar>{ratingData}</Avatar>}
                    label='Rating'
                    bColor='green'
                />
            )}
            {ratingData >= 80 && (
                <Chip
                    avatar={<Avatar>{ratingData}</Avatar>}
                    label='Rating'
                    bColor='purple'
                />
            )}
        </>
    );
};
