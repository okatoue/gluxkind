import {Button, StyleSheet, View, FlatList} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect} from "react"
import FetchImage from './FetchImage';

type Photo = {
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
};

const URL = "https://jsonplaceholder.typicode.com/photos"

const cachePhotos = async (photos) => {
  console.log("it works")
  try {
    await AsyncStorage.setItem('photos', JSON.stringify(photos));
  } catch (error) {
    console.error('Error saving photos to cache', error);
  }
};

const loadCachedPhotos = async () => {
  console.log("it worked")
  try {
    const cachedPhotos = await AsyncStorage.getItem('photos');
    if (cachedPhotos !== null) {
      return JSON.parse(cachedPhotos);
    }
  } catch (error) {
    console.error('Error loading cached photos', error);
  }
  return [];
};

const shuffleArrayRecursive = (array, currentIndex, callback) => {
  if (currentIndex <= 0) {
    cachePhotos(array);
    return callback(array);
  }

  const randomIndex = Math.floor(Math.random() * (currentIndex + 1));

  [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];

  
  setTimeout(() => {
    shuffleArrayRecursive(array, currentIndex - 1, callback);
  }, 0);
};


const FetchAPI = () => {
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const fetchPhotos = async () => {
        const cachedPhotos = await loadCachedPhotos();
        if (cachedPhotos.length > 0) {
          setPhotos(cachedPhotos);
          setLoading(false);
        } else {
          fetch(URL)
            .then((response) => response.json())
            .then((data) => {
              setPhotos(data);
              setLoading(false);
              cachePhotos(data)
            })
            .catch((error) => {
              console.error(error);
              setLoading(false);
            });
        }
      };

      fetchPhotos();
    }, []);

      const shufflePhotos = () => {
        const photosCopy = [...photos];
        const currentIndex = photosCopy.length - 1;
      
        shuffleArrayRecursive(photosCopy, currentIndex, (shuffledPhotos) => {
          setPhotos(shuffledPhotos);
        });
        
      };
  

    return (
        <View>
            <FlatList 
                data={photos}
                renderItem={({ item }) => (
                <View>
                    <FetchImage imageUrl={item.url} title={item.title} id={item.id}/>
                </View>
                )}
            />
            <Button title="Shuffle Photos" onPress={shufflePhotos} />
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default FetchAPI;