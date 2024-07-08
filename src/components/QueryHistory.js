// src/components/QueryHistory.js
import React from 'react';
import { ListGroup, Button } from 'react-bootstrap';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './QueryHistory.css';

const QueryHistory = ({ history, onClick, clearHistory, setHistory }) => {
  const handleDelete = (index) => {
    const newHistory = [...history];
    newHistory.splice(index, 1);
    setHistory(newHistory);
    localStorage.setItem('queryHistory', JSON.stringify(newHistory));
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedHistory = Array.from(history);
    const [removed] = reorderedHistory.splice(result.source.index, 1);
    reorderedHistory.splice(result.destination.index, 0, removed);

    setHistory(reorderedHistory);
    localStorage.setItem('queryHistory', JSON.stringify(reorderedHistory));
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h6 className="mb-0">History ({history.length})</h6>
        <Button variant="danger" size="sm" onClick={clearHistory}>Clear History</Button>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="history">
          {(provided) => (
            <ListGroup {...provided.droppableProps} ref={provided.innerRef}>
              {history.map((item, index) => (
                <Draggable key={index} draggableId={String(index)} index={index}>
                  {(provided, snapshot) => (
                    <ListGroup.Item
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`query-history-item ${snapshot.isDragging ? 'dragging' : ''}`}
                    >
                      <div className="d-flex justify-content-between align-items-center">
                        <div
                          className="content"
                          onClick={() => onClick(item.query, item.description)}
                          style={{ cursor: 'pointer' }}
                        >
                          <strong>{item.query}</strong> <br />
                          <small>{item.description}</small> <br />
                          <small>{item.timestamp}</small>
                        </div>
                        <Button variant="danger" size="sm" onClick={() => handleDelete(index)}>Delete</Button>
                      </div>
                    </ListGroup.Item>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ListGroup>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default QueryHistory;
