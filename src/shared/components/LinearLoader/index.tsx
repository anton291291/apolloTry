import React from 'react';

import styled from 'styled-components';
import { LinearProgress } from '@material-ui/core';

const Progress = styled(LinearProgress)`
    && {
        &&.MuiLinearProgress-colorPrimary {
            background-color: rgb(72, 61, 139);
        }

        .MuiLinearProgress-barColorPrimary {
            background-color: rgb(123, 104, 238);
        }

        &.MuiLinearProgress-root {
            height: 4px;
            overflow: hidden;
            position: fixed;
            bottom: 0px;
            left: 0px;
            width: 100vw;
            z-index: 1;
            height: 6px;
        }
    }
`;

type Props = {};

export const LinearLoader: React.FC<Props> = (props) => {
    const {} = props;

    return <Progress />;
};
