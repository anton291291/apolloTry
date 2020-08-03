import React from 'react';

import styled from 'styled-components';
import {
    BarChart,
    Bar,
    ResponsiveContainer,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from 'recharts';
import { Tile } from '@/shared/styled components';
import { Box, Typography } from '@material-ui/core';

const ChartTile = styled(Tile)`
    width: 100%;
`;

type Props = {
    tagsData: Array<any>;
};

export const FullTitleTagsChart: React.FC<Props> = (props) => {
    const { tagsData } = props;

    return (
        <ChartTile>
            <Typography align='center' variant='h6'>
                Tags rank
            </Typography>
            <Box width='100%' height='400px' marginRight='-40px'>
                <ResponsiveContainer>
                    <BarChart
                        layout='vertical'
                        data={tagsData}
                        margin={{
                            top: 10,
                            right: 20,
                            left: 20,
                            bottom: 10
                        }}
                    >
                        <XAxis type='number' />
                        <YAxis dataKey='name' type='category' />
                        <Tooltip />
                        <Bar
                            barSize={15}
                            dataKey='rank'
                            fill=' rgb(72, 61, 139)'
                        />
                    </BarChart>
                </ResponsiveContainer>
            </Box>
        </ChartTile>
    );
};
