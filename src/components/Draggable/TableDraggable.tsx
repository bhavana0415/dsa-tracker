import React from "react";
import DraggableList from "react-draggable-lists";

export const TableDraggable = ({ list }: { list: any[] }) => {
    return (
        <div className="App">
            <div style={{ width: 300, margin: "0 auto" }}>
                <DraggableList width={500} height={50} rowSize={1}
                >
                    {list.map((item, index) => (
                        <li key={index}>{`${index + 1}.  ${item}`}</li>
                    ))}
                </DraggableList>
            </div>
        </div>
    );
}

