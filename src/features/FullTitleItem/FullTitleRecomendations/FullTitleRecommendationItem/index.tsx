import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Tooltip } from '@material-ui/core';
import { useImageLoad } from '@/shared/hooks/useImageLoad';
import { StyledSkeleton } from '@/shared/styled components';

const Cover = styled.img`
    margin: 0 5px;
    width: 180px !important;
    height: 280px;
    box-shadow: 0 0 5px;
`;
const StyledTooltip = styled(Tooltip)``;

type Props = {
    linkTo: string;
    tooltipTitle: string;
    rating: number;
    image: string;
};

export const FullTitleRecommendationItem: React.FC<Props> = (props) => {
    const { image, linkTo, rating, tooltipTitle } = props;

    const { imageSrc, loading } = useImageLoad(
        image,
        'https://www.purefandom.com/wp-content/uploads/2018/12/Deku-crying-780x405.png'
    );

    return (
        <Link to={`/anime/${linkTo}`}>
            <StyledTooltip
                arrow
                title={`${tooltipTitle}
        //
        Rating: ${rating}`}
            >
                {loading ? (
                    <StyledSkeleton
                        animation='pulse'
                        variant='rect'
                        width={180}
                        height={280}
                    />
                ) : (
                    <Cover src={imageSrc} />
                )}
            </StyledTooltip>
        </Link>
    );
};
