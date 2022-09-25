import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';
import { createIconSetFromFontello } from 'react-native-vector-icons';

export function Home() {
  
  const [tasks, setTasks] = useState<Task[]>([]);

  
  function handleAddTask(newTaskTitle: string) {

    const invalidTitle = tasks.find(task => task.title === newTaskTitle);
    
    if(invalidTitle)
      return Alert.alert('Task já cadastrada','Você não pode cadastrar uma task com o mesmo nome');

      let item = {
      id : new Date().getTime(),
      title: newTaskTitle,
      done: false,
      inEditing : false
    }

    setTasks( oldState => [...oldState , item] ) ;
 
  }

  function handleEditTask(id: number, title: string) {
    
    const updatedTasks = tasks.map(task => ({ ...task }));
    const item = updatedTasks.find(task => task.id === id);
   
    if (!item)
      return;

    if (item.inEditing)  
      item.title = title;  

    item.inEditing = !item.inEditing;
 
    setTasks(updatedTasks);
 

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
    Alert.alert('Remover item','Tem certeza que você deseja remover esse item?',[
      {
        style : 'cancel',
        text : 'Não'

      },
      {
        style : 'destructive',
        text : 'Sim',
        onPress: () =>{
          const updatedTasks = tasks.map(task => ({ ...task }));
          const itensFiltrados = updatedTasks.filter(task => task.id !== id);
          setTasks(itensFiltrados);
        }
      }
    ])
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
        editTask={handleEditTask}
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