/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Image,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';

const Home = ({navigation}) => {
  const [recipeData, setRecipeData] = useState([]);

  const getRecipeData = () => {
    const options = {
      method: 'GET',
      url: 'https://tasty.p.rapidapi.com/recipes/list',
      params: {from: '0', size: '20', tags: 'under_30_minutes'},
      headers: {
        'X-RapidAPI-Key': '17efed119cmsh2436f993a6e5d22p1c0fc9jsn2f53a0d28f39',
        'X-RapidAPI-Host': 'tasty.p.rapidapi.com',
      },
    };

    axios
      .request(options)
      .then(function (response) {
        // console.log(response.data);
        setRecipeData(response.data.results);
        response.data.results.map(data => {
          // console.log('name', data);
          // console.log('ingredients', data.sections);
        });
      })
      .catch(function (error) {
        console.error(error);
      });
  };
  const Item = ({item}) => (
    // <View style={styles.item}>
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        marginTop: 10,
        borderRadius: 10,
        backgroundColor: '#ececec',
      }}
      onPress={() => navigation.navigate('Recipe', {item: item})}>
      <Image style={styles.recipeImage} source={{uri: item.thumbnail_url}} />
      <View
        style={{
          width: '75%',
          paddingHorizontal: 20,
          display: 'flex',
          justifyContent: 'space-between',
        }}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={{color: 'black'}}>
          {item.prep_time_minutes} Minutes | {item.num_servings} Servings
        </Text>
      </View>
    </TouchableOpacity>
  );
  {
    /* thumbnail_url */
  }
  // {console.log(item)}
  {
    /* </View> */
  }

  const renderItem = ({item}) => <Item item={item} />;

  useEffect(() => {
    getRecipeData();
  }, []);

  return (
    // <View
    //   style={{
    //     flex: 1,
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //   }}>
    //   <Text>Home</Text>
    //   {console.log('first')}
    //   <TouchableOpacity onPress={() => navigation.navigate('Recipe')}>
    //     <Text>Navigate to Recipe</Text>
    //   </TouchableOpacity>
    //   <FlatList />
    // </View>
    <SafeAreaView style={styles.container}>
      <FlatList
        data={recipeData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#ececec',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  name: {
    fontSize: 20,
    color: 'black',
    fontWeight: '500',
    marginBottom: 10,
  },
  recipeImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  logo: {
    width: 66,
    height: 58,
  },
});

export default Home;
