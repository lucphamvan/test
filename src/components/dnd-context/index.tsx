import { Stack } from "@mui/material";

import React from "react";
import { DragDropContext, Draggable, OnDragEndResponder } from "react-beautiful-dnd";
import { Droppable } from "./droppable";

interface DndContextProp {
    onDragEnd: OnDragEndResponder;
    children: React.ReactNode;
    id: string;
}
export const DndContext = ({ onDragEnd, children, id }: DndContextProp) => {
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId={id}>
                {(provided) => (
                    <Stack {...provided.droppableProps} ref={provided.innerRef}>
                        {children}
                        {provided.placeholder}
                    </Stack>
                )}
            </Droppable>
        </DragDropContext>
    );
};

interface DragContextProp {
    id: string;
    index: number;
    children: React.ReactNode;
}
export const DragContext = ({ id, index, children }: DragContextProp) => {
    return (
        <Draggable draggableId={id} index={index}>
            {(provided, snapshort) => {
                let transform = provided.draggableProps.style?.transform;

                if (snapshort.isDragging && transform) {
                    transform = transform.replace(/\(.+,/, "(0,");
                }

                const style = {
                    ...provided.draggableProps.style,
                    transform
                };

                return (
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={style}
                    >
                        {children}
                    </div>
                );
            }}
        </Draggable>
    );
};
