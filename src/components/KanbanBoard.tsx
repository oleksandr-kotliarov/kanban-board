import { Paper } from '@mui/material';
import React, { memo } from 'react';
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from 'react-beautiful-dnd';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setKanban } from '../features/kanbanSlice';
import { Col, Row } from 'antd';
import { IssueCard } from './IssueCard';

export const KanbanBoard: React.FC = memo(() => {
  const dispatch = useAppDispatch();
  const { kanban } = useAppSelector((state) => state);
  const { link } = useAppSelector((state) => state.repositoryLink);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (destination !== undefined) {
      const sourceColIndex = kanban.findIndex(
        (col) => col.id === source.droppableId,
      );
      const sourceCol = kanban[sourceColIndex];
      const sourceTask = [...sourceCol.tasks];

      const [removed] = sourceTask.splice(source.index, 1);

      if (source.droppableId !== destination.droppableId) {
        const destinationColIndex = kanban.findIndex(
          (col) => col.id === destination.droppableId,
        );
        const destinationCol = kanban[destinationColIndex];
        const destinationTask = [...destinationCol.tasks];

        destinationTask.splice(destination.index, 0, removed);

        dispatch(
          setKanban({
            col: [destinationColIndex],
            tasks: [destinationTask],
            link,
          }),
        );
      } else {
        sourceTask.splice(destination.index, 0, removed);
      }

      dispatch(setKanban({ col: [sourceColIndex], tasks: [sourceTask], link }));
    }
  };

  return (
    <Row gutter={60}>
      <DragDropContext onDragEnd={onDragEnd}>
        {kanban.map((section) => (
          <Col key={section.id} span={8}>
            <h1 className="App__FieldTitle">{section.title}</h1>
            <Droppable droppableId={section.id}>
              {(provided) => (
                <Paper
                  elevation={12}
                  className="App__IssuesField"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {section.tasks.map((task, index) => (
                    <Draggable
                      key={task.node_id}
                      index={index}
                      draggableId={task.node_id}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            ...provided.draggableProps.style,
                            opacity: snapshot.isDragging ? 0.8 : 1,
                          }}
                        >
                          <IssueCard task={task} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </Paper>
              )}
            </Droppable>
          </Col>
        ))}
      </DragDropContext>
    </Row>
  );
});
