import React from 'react';
import { FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { TaskItem } from './TaskItem';
import { ItemWrapper } from './ItemWrapper';

import trashIcon  from '../assets/icons/trash/trash.png'
import pencilIcon from '../assets/icons/pencil/pen.png'

export interface Task {
  id: number;
  title: string;
  done: boolean;
  inEditing: boolean;
}

interface TasksListProps {
  tasks: Task[];
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (id: number, title: string) => void;
}

export function TasksList({ tasks, toggleTaskDone, removeTask, editTask }: TasksListProps) {
  return (

    <FlatList
      data={tasks}
      keyExtractor={item => item.id}
      contentContainerStyle={{ paddingBottom: 24 }}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, index }) => {
        return (
          <ItemWrapper index={index}>
         
         <TaskItem
              index={index}
              item={item} 
              toggleTaskDone={toggleTaskDone}
              removeTask={removeTask} 
              editTask={editTask}
         />

 
          </ItemWrapper>
        )
      }}
      style={{
        marginTop: 32
      }}
    />

  )
}

