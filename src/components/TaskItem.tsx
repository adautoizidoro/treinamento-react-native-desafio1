import React, {useState, useEffect, useRef} from 'react';
import {  Image, TouchableOpacity, View, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import trashIcon  from '../assets/icons/trash/trash.png'
import pencilIcon from '../assets/icons/pencil/pen.png'

export interface item {
    id: number;
    title: string;
    done: boolean;
    inEditing: boolean;
  }

interface TasksItemProps {
    item:item;
    index : number;
    toggleTaskDone: (id: number) => void;
    removeTask: (id: number) => void;
    editTask: (id: number, title :string) => void;
  }

export function TaskItem({ index, item, toggleTaskDone, removeTask, editTask }: TasksItemProps) {
    
    const [newTitle, setNewTitle] = useState(item.title);
    const textInputRef = useRef<TextInput>(null)

    function cancelEditTask(){
        setNewTitle(item.title);
        editTask(item.id,item.title);
    }

    useEffect(() => {
        if (textInputRef.current) {
          if (item.inEditing) {
            textInputRef.current.focus();
          } else {
            textInputRef.current.blur();
          }
        }
      }, [item.inEditing])


    return (
        <View style={styles.alignItem}>
             <View style={styles.sizeAlign}>
              <TouchableOpacity 
                testID={`button-${index}`}
                activeOpacity={0.7}
                style={styles.taskButton}
                onPress={() => toggleTaskDone (item.id)}
              >
                <View 
                  testID={`marker-${index}`}
                >
                    <Icon   style={item.done? styles.taskMarkerDone:styles.taskMarker}  
                      name="check"
                      size={12}
                      color="#FFF"
                    />
                </View>
                <TextInput 
                ref={textInputRef}
                style={ item.done ? styles.taskTextDone : styles.taskText}
                value={newTitle}
                editable={item.inEditing}
                onChangeText={setNewTitle}
                onSubmitEditing={() => editTask (item.id , newTitle)}
                />


              </TouchableOpacity>
            </View>

            <View style={styles.alignIconsButton}>

            <TouchableOpacity
                testID={`trash-${index}`}
                style={{ paddingHorizontal: 10
                }}
                onPress={cancelEditTask}
              >
              { item.inEditing ? 
              (<Icon name="x" size={24} color="#B2B2B2" />)
              :
              (<Image source={pencilIcon} /> )
              }
              
              </TouchableOpacity>

              <View style={styles.divisor}/>           
              
              <TouchableOpacity
                testID={`trash-${index}`}
                style={{ paddingHorizontal: 10
                   }}
                onPress={() => removeTask (item.id)}
                disabled={item.inEditing}
              >
                <Image source={trashIcon} style={{ opacity: item.inEditing ? 0.2 : 1 }} />
              </TouchableOpacity>

            </View>
        </View>    
    )

}

const styles = StyleSheet.create({
    divisor: {
      height: 24,
      width: 1,
      color: 'rgba(196, 196, 196, 0.24)'
      },
      sizeAlign: {
        width: 300
      },
    alignIconsButton: {
    flexDirection: 'row',
    alignItems: 'flex-end'
    },
    alignItem: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "space-between"
        },
    taskButton: {
      flex: 1,
      paddingHorizontal: 24,
      paddingVertical: 15,
      marginBottom: 4,
      borderRadius: 4,
      flexDirection: 'row',
      alignItems: 'center'
    },
    taskMarker: {
      height: 15,
      width: 14,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: '#B2B2B2',
      marginRight: 15,
      alignItems: 'center',
      justifyContent: 'center'
    },
    taskText: {
      color: '#666',
      fontFamily: 'Inter-Medium'
    },
    taskMarkerDone: {
      height: 15,
      width: 14,
      borderRadius: 4,
      backgroundColor: '#1DB863',
      marginRight: 15,
      alignItems: 'center',
      justifyContent: 'center'
    },
    taskTextDone: {
      color: '#1DB863',
      textDecorationLine: 'line-through',
      fontFamily: 'Inter-Medium'
    }
  })