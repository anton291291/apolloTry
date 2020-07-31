import React from 'react';

import styled from 'styled-components';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { genreFilterVar } from '@/shared/cache';

type Props = {};
const animatedComponents = makeAnimated();

const options = [
    { value: 'Action', label: 'Action', color: '#d64161' },
    { value: 'Adventure', label: 'Adventure', color: '#6b5b95' },
    { value: 'Comedy', label: 'Comedy', color: '#feb236' },
    { value: 'Drama', label: 'Drama', color: '#ff7b25' },
    { value: 'Ecchi', label: 'Ecchi', color: '#b5e7a0' },
    { value: 'Fantasy', label: 'Fantasy', color: '#405d27' },
    { value: 'Hentai', label: 'Hentai', color: '#ffef96' },
    { value: 'Horror', label: 'Horror', color: '#50394c' },
    { value: 'Mahou Shoujo', label: 'Mahou Shoujo', color: '#f4e1d2' },
    { value: 'Mecha', label: 'Mecha', color: '#618685' },
    { value: 'Music', label: 'Music', color: '#f18973' },
    { value: 'Mystery', label: 'Mystery', color: '#4040a1' },
    { value: 'Psychological', label: 'Psychological', color: '#96897f' },
    { value: 'Romance', label: 'Romance', color: '#484f4f' },
    { value: 'Sci-Fi', label: 'Sci-Fi', color: '#d4ac6e' },
    { value: 'Slice of Life', label: 'Slice of Life', color: '#87bdd8' },
    { value: 'Sports', label: 'Sports', color: '#667292' },
    { value: 'Supernatural', label: 'Supernatural', color: '#034f84' },
    { value: 'Thriller', label: 'Thriller', color: '#bc5a45' }
];

const colourStyles = {
    control: (provided) => ({
        ...provided,
        minHeight: 28,
        minWidth: 200,
        height: 28,
        borderRadius: 12,
        marginLeft: 20,
        border: 0
    }),
    valueContainer: (provided) => ({
        ...provided,
        position: 'unset'
    }),
    menu: (provided) => ({
        ...provided,
        backgroundColor: 'rgb(72, 61, 139)',
        left: 20
    }),
    option: (provided, { data, isDisabled, isFocused, isSelected }) => ({
        ...provided,
        backgroundColor: isDisabled
            ? null
            : isSelected
            ? data.color
            : isFocused
            ? data.color
            : null
    }),

    indicatorsContainer: (provided) => ({
        ...provided,
        minHeight: 28,
        height: 28
    }),
    multiValue: (styles, { data }) => {
        return {
            ...styles,
            backgroundColor: data.color,
            borderRadius: '9px',
            height: '20px'
        };
    },
    multiValueLabel: (styles, { data }) => ({
        ...styles,
        color: 'white'
    })
};

export const GenreSelect: React.FC<Props> = (props) => {
    const {} = props;

    const { genresValues } = genreFilterVar();

    const handleSelect = (value: typeof options) => {
        let arr = [];
        value?.length !== 0 && value.map((obj) => arr.push(obj.value));
        /*  console.log(value) */
        genreFilterVar({ genresValues: arr });
    };

    return (
        <Select
            onChange={handleSelect}
            closeMenuOnSelect={false}
            components={animatedComponents}
            isMulti
            options={options}
            styles={colourStyles}
        />
    );
};
