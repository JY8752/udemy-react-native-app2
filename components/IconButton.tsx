import React, { ComponentProps, VFC } from 'react';
import { GestureResponderEvent, TouchableOpacity } from 'react-native';
import tw from 'tailwind-rn';
import { AntDesign } from '@expo/vector-icons';

type GlyphNames = ComponentProps<typeof AntDesign>['name'];

type Props = {
  name: GlyphNames;
  color: string;
  size: number;
  onPress: (e: GestureResponderEvent) => void;
};

export const IconButton: VFC<Props> = ({ color, size, onPress, name }) => (
  <TouchableOpacity style={tw('items-center')} onPress={onPress}>
    <AntDesign size={size} name={name} color={color} />
  </TouchableOpacity>
);
