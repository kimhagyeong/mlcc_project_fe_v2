import React from 'react';
import styled from "styled-components";
import { Rect } from "react-konva";
import ImgElemContainer from "./img_elem_container"
import IconButton from '@mui/material/IconButton';
import BuildIcon from '@mui/icons-material/Build';

const H3 = styled.h3`
    font-size:1rem;
    text-align: right;
    padding-right: 12px;
`;

const Div = styled.div`
    width:100%;
    height:100%;
    overflow:hidden;
    margin:auto;
    position:relative;
`;

export default (props) => {
    const rect = () => {
        if (props.bbox) {
            return (
                <>
                    {props.bbox.map((elem, key) => (
                        <Rect
                            key={key}
                            x={elem.bbox['box_x']}
                            y={elem.bbox['box_y']}
                            width={elem.bbox['box_width']}
                            height={elem.bbox['box_height']}
                            stroke={elem.b_color}
                        />)
                    )}
                </>
            )
        }
    }
    return (
        <>
            <H3>{props.path}</H3>
            <Div>
                <ImgElemContainer
                    rect={rect}
                    img={props.img}
                    width={props.width}
                    height={props.height}
                    x={props.x}
                    y={props.y}
                    scale={props.scale}
                />
            </Div>
        </>
    )
}
