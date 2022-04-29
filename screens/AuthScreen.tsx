import React, { VFC } from 'react';
import { Text, SafeAreaView } from 'react-native';
import { useFirebaseAuth } from '../hooks/useFirebaseAuth';
import tw from 'tailwind-rn';
import { FontAwesome } from '@expo/vector-icons';
import { InputField } from '../components/InputField';
import { Button } from '../components/Button';
import { IconButton } from '../components/IconButton';

export const AuthScreen: VFC = () => {
  const {
    isLogin,
    email,
    password,
    authErr,
    login,
    register,
    setEmail,
    setPassword,
    toggleMode,
  } = useFirebaseAuth();
  return (
    <SafeAreaView
      style={[tw('flex-1 pt-16 items-center'), { backgroundColor: '#008b8b' }]}
    >
      <FontAwesome name="tasks" size={50} color="white" />
      <Text style={tw('text-2xl text-white font-semibold mt-2 mb-5')}>
        {isLogin ? 'Login' : 'SignUp'}
      </Text>
      <InputField
        leftIcon="email"
        placeholder="Enter email"
        keyboardType="email-address"
        textContentType="emailAddress"
        autoFocus
        value={email}
        onChangeText={(text: string) => setEmail(text)}
      />
      <InputField
        leftIcon="lock"
        placeholder="Enter password"
        secureTextEntry
        textContentType="password"
        value={password}
        onChangeText={(text: string) => setPassword(text)}
      />
      {authErr !== '' && (
        <Text style={tw('text-yellow-300 my-3 font-semibold')}>{authErr}</Text>
      )}
      <Button
        onPress={isLogin ? login : register}
        title={isLogin ? 'Login' : 'Register'}
      />
      <Text>{isLogin ? 'Create new account ?' : 'Login ?'}</Text>
      <IconButton name="retweet" size={24} color="#fff" onPress={toggleMode} />
    </SafeAreaView>
  );
};
