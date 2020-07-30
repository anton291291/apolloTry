import React from 'react';

import styled from 'styled-components';
import { CircularProgress } from '@material-ui/core';

const Spinner = styled(CircularProgress)`
    && {
        &&.MuiCircularProgress-colorPrimary {
            color:  rgb(72, 61, 139);
        }
    }
`;

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`;

type Props = {};

export const Loader: React.FC<Props> = (props) => {
    const {} = props;

    return (
        <Container>
            <Spinner size={100} />
        </Container>
    );
};
