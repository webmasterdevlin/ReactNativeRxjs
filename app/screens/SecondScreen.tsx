import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, StatusBar, View} from 'react-native';
import {Text} from 'react-native-elements';
import {catchError, map, mergeMap, takeUntil} from 'rxjs/operators';
import {forkJoin, Subject, Subscription} from 'rxjs';

import {Post} from '../models/post';
import {Album} from '../models/album';
import {User} from '../models/user';
import {EndPoints} from '../api/api-config';
import {get} from '../api';

const SecondScreen = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [userName, setUserName] = useState('');
  const [albums, setAlbums] = useState<Album[]>([]);

  let subscription: Subscription;

  useEffect(() => {
    // tryMergeMap();
    tryForkJoin();
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const tryMergeMap = () => {
    subscription = get<User[]>(`${EndPoints.users}?username=Bret`)
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

  const tryForkJoin = () => {
    subscription = get<User[]>(`${EndPoints.users}?username=Bret`)
      .pipe(
        map<User[], User>(users => {
          const user = users[0];
          setUserName(user.username);

          return user;
        }),
        mergeMap<User, any[]>(user => {
          const postsData2 = get<Post[]>(
            `${EndPoints.posts}?userId=${user.id}`,
          );
          const albumsData2 = get<Album[]>(
            `${EndPoints.albums}?userId=${user.id}`,
          );

          return forkJoin<any[]>([postsData2, albumsData2]);
        }),
        catchError(err => {
          console.log(err);
          return err;
        }),
      )
      .subscribe(result => {
        console.log('result[0]::', JSON.stringify(result[0], null, 2));
        console.log('result[1]::', JSON.stringify(result[1], null, 2));
        setPosts(result[0]);
        setAlbums(result[1]);
      });
  };

  return (
    <SafeAreaView>
      <StatusBar />
      <ScrollView contentContainerStyle={{paddingBottom: 100}}>
        <View
          style={{
            backgroundColor: '#FFF',
            padding: 20,
          }}>
          <View
            style={{
              backgroundColor: '#FFF',
              padding: 20,
            }}>
            <Text h2>mergeMap</Text>
          </View>
          {posts?.map(post => (
            <View key={post.id}>
              <Text h3>{post.title}</Text>
            </View>
          ))}
        </View>
        <View
          style={{
            backgroundColor: '#FFF',
            padding: 20,
          }}>
          <View
            style={{
              backgroundColor: '#FFF',
              padding: 20,
            }}>
            <Text h2>forkJoin</Text>
          </View>
          {albums?.map(album => (
            <View key={album.id}>
              <Text h3>{album.title}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SecondScreen;
