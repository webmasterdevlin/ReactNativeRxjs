import React from 'react';
import {View} from 'react-native';
import {Button, Text} from 'react-native-elements';
import {StackNavigationProp} from '@react-navigation/stack';

type Props = {
  navigation: StackNavigationProp<any, any>;
};

const FirstScreen = ({navigation}: Props) => {
  return (
    <View style={{height: '100%'}}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text h1>Welcome</Text>
      </View>
      <View>
        <Button
          onPress={() => navigation.navigate('Second Screen')}
          title={'NEXT SCREEN'}
        />
      </View>
    </View>
  );
};

export default FirstScreen;
