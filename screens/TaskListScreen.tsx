import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { VFC } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TaskItem } from '../components/TaskItem';
import { useGetTasks } from '../hooks/useGetTasks';
import { useToggleDeleteTask } from '../hooks/useToggleDeleteTask';
import { RootStackParamList, Task } from '../types/types';
import tw from 'tailwind-rn';
import { Title } from '../components/Title';
import { FlatList, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';

type Item = {
  item: Task;
};

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'TaskList'>;
};

export const TaskListScreen: VFC<Props> = ({ navigation }) => {
  const { tag, deleteTask, toggleCompleted } = useToggleDeleteTask();
  const { tasks, getErr } = useGetTasks();
  const taaskKeyExtractor = (item: Task) => item.id;
  const taskRenderItem = ({ item }: Item) => (
    <TaskItem
      id={item.id}
      title={item.title}
      createdAt={item.createdAt}
      completed={item.completed}
      toggleCompleted={toggleCompleted}
      deleteTask={deleteTask}
    />
  );
  return (
    <SafeAreaView style={tw('flex-1')}>
      <Title first="Tasks" last={tag.name} />
      <View style={tw('items-center')}>
        <TouchableOpacity onPress={() => navigation.navigate('CreateTask')}>
          <MaterialIcons name="playlist-add" size={40} color="#5f9ea0" />
        </TouchableOpacity>
        <Text style={tw('text-gray-700 mt-2 mb-5')}>Add task</Text>
        {getErr !== '' && (
          <Text style={tw('text-red-500 my-5 font-semibold')}>{getErr}</Text>
        )}
      </View>
      <View style={tw('flex-1 m-2')}>
        <FlatList
          data={tasks}
          keyExtractor={taaskKeyExtractor}
          keyboardShouldPersistTaps="always"
          renderItem={taskRenderItem}
        />
      </View>
    </SafeAreaView>
  );
};
