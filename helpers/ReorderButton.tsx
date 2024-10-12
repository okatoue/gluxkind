import React from 'react'
import { Button, Alert, Text, View, Image} from 'react-native';

const shuffleArray = (array, currentIndex = array.length - 1) => {
    if (currentIndex <= 0) return array;
  
    const randomIndex = Math.floor(Math.random() * (currentIndex + 1));
  
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  
    return shuffleArray(array, currentIndex - 1);
  };

export default shuffleArray
