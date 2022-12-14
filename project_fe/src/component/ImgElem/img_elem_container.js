import React from "react";
import { Stage, Layer } from "react-konva";
import ImgElem from "./img_elem"
import Img from "../../resource/new_align_0001.jpg"


class ImgElemContainer extends React.Component {
    state = {
        stageScale: this.props.scale,
        stageX: 0,
        stageY: 0
    };
    handleWheel = (e) => {
        e.evt.preventDefault();

        const scaleBy = 1.05;
        const stage = e.target.getStage();
        const oldScale = stage.scaleX();
        const mousePointTo = {
            x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
            y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale
        };

        const newScale = e.evt.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;

        stage.scale({ x: newScale, y: newScale });

        this.setState({
            stageScale: newScale,
            stageX:
                -(mousePointTo.x - stage.getPointerPosition().x / newScale) * newScale,
            stageY:
                -(mousePointTo.y - stage.getPointerPosition().y / newScale) * newScale
        });
    };

    img() {
        return (Img)
    }
    render() {
        return (
            // default image size를 바꾸고 싶을때는 여기로....
            // resize 툴 크기 만큼 자르변 적용되게 하려면 작업이 필요ㅠ무뭄
            <Stage
                width={this.props.width}
                height={this.props.height}
                onWheel={this.handleWheel}
                scaleX={this.state.stageScale}
                scaleY={this.state.stageScale}
                x={this.props.x}
                y={this.props.y}
            >
                <Layer
                    draggable
                    onDragStart={() => {
                        this.setState({
                            isDragging: true
                        });
                    }}
                    onDragEnd={(e) => {
                        this.setState({
                            isDragging: false,
                            x: e.target.x(),
                            y: e.target.y()
                        });
                    }}
                >
                    <ImgElem
                        src={this.props.img}
                        x={0}
                        y={0}
                    />
                    {
                        this.props.rect()
                    }
                </Layer>
            </Stage>
        );
    }
}
export default ImgElemContainer;