import React from 'react';

import styled from 'styled-components';
import { LinearProgress } from '@material-ui/core';

const Progress = styled(LinearProgress)`
    && {
        &&.MuiLinearProgress-colorPrimary {
            background-color: rgb(0, 206, 209);
        }

        .MuiLinearProgress-barColorPrimary {
            background-color: rgb(222, 184, 135);
        }

        &.MuiLinearProgress-root {
            height: 4px;
            overflow: hidden;
            position: fixed;
            bottom: 0px;
            left: 0px;
            width: 100vw;
        }
    }
`;

type Props = {};

export const LinearLoader: React.FC<Props> = (props) => {
    const {} = props;

    return <Progress />;
};
