import React from 'react'
import { StyleSheet, Text, View, Image, Platform } from 'react-native';

type FetchImageProps = {
  imageUrl: string;
  title: string;
  id: number;
}

const FetchImage : React.FC<FetchImageProps> = ({ imageUrl, title, id }) => {
    return (
      <View style={styles.container}>
        <View style={styles.imageShadow}>
        <Image 
          style={styles.image}
          source={{uri: imageUrl}}
        />
        </View>
        <View style={styles.textPosition}>
            {<Text> {id} </Text>}
            {<Text style={styles.textStyle}> {title} </Text>}
        </View>
      </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 15, 
      borderRadius: 15,
    },
    image: {
      width: 300,
      height: 300,
      borderRadius: 15,
      backgroundColor: 'grey',
      borderWidth: 2,
      marginBottom: 15,
    },
    imageShadow: {
      shadowColor: '#000',
      shadowOffset: { width: 10, height: 10},
      shadowOpacity: 0.8,
      shadowRadius: 2,    
    },
    textPosition: {
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
    },
    textStyle: {
      color: 'white',
      fontSize: 14,
      transform: [{ rotate: '45deg'}]
    }
});

export default FetchImage;