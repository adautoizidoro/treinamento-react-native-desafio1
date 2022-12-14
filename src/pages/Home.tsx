import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';
import { createIconSetFromFontello } from 'react-native-vector-icons';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  
  function handleAddTask(newTaskTitle: string) {

      let item = {
      id : new Date().getTime(),
      title: newTaskTitle,
      done: false
    }

    setTasks( oldState => [...oldState , item] ) ;
 
  }

  function handleToggleTaskDone(id: number) {
    
    const updatedTasks = tasks.map(task => ({ ...task }));
    const item = updatedTasks.find(task => task.id === id);
   
    if (!item)
      return;

    item.done = !item.done;
    setTasks(updatedTasks);

  }

  function handleRemoveTask(id: number) {

    const updatedTasks = tasks.map(task => ({ ...task }));
    const itensFiltrados = updatedTasks.filter(task => task.id !== id);
    setTasks(itensFiltrados);
    
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})