import React, {useEffect, useState} from 'react';
import {Text} from 'react-native-elements';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {SafeAreaView, ScrollView, StatusBar, View} from 'react-native';

import {get} from './app/api';
import {Post} from './app/models/post';
import {EndPoints} from './app/api/api-config';
import {User} from './app/models/user';

const App = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    getPostsByUserId();
  }, []);

  const getPostsByUserId = () => {
    get<User[]>(`${EndPoints.users}?username=Bret`)
      .pipe(
        map(users => {
          const user = users[0];
          setUserName(user.username);
          console.log('USERS::', JSON.stringify(users, null, 2));
          return user;
        }),
        mergeMap<User, any>(user =>
          get<Post[]>(`${EndPoints.posts}?userId=${user.id}`),
        ),
        catchError(err => {
          console.log(err);
          return err;
        }),
      )
      .subscribe(posts => {
        console.log('POSTS::', JSON.stringify(posts, null, 2));
        setPosts(posts);
      });
  };

  return (
    <SafeAreaView>
      <StatusBar />
      <ScrollView>
        <View
          style={{
            backgroundColor: '#FFF',
            padding: 20,
          }}>
          <Text h2>{userName}</Text>
        </View>
        <View
          style={{
            backgroundColor: '#FFF',
            padding: 20,
          }}>
          {posts?.map(post => (
            <View key={post.id}>
              <Text h3>{post.title}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
