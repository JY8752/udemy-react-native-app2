import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { db } from '../firebaseConfig';
import { selectUser } from '../slices/userSlice';
import { RootStackParamList } from '../types/types';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'CreateTag'>;
};

export const useCreateTag = ({ navigation }: Props) => {
  const user = useSelector(selectUser);
  const [name, setName] = useState('');
  const [createErr, setCreateErr] = useState('');

  const createTag = async () => {
    if (name !== '') {
      setCreateErr('');
      try {
        await addDoc(collection(db, 'users', user.uid, 'tags'), {
          name,
          createdAt: serverTimestamp(),
        });
        setName('');
        navigation.goBack();
      } catch (err: any) {
        setName('');
        setCreateErr(err.message);
      }
    }
  };
  return {
    name,
    setName,
    createErr,
    createTag,
  };
};
