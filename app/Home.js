import React, { useEffect, useState } from 'react';
import api from '../api';
import { StyleSheet, Text, View, FlatList, SafeAreaView, StatusBar, Button, } from "react-native";


const Item = ({ name, title, description }) => (
  <View style={styles.FlatListStyle}>
    <Text style={styles.FlatListNameStyle}>{name}</Text>
    <Text style={styles.FlatListTitleStyle}>{title}</Text>
    <Text style={styles.FlatListDescriptionStyle}>{description}</Text>
  </View>
);

export default function Page({ navigation }) {

    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
        const response = await api.get('/');
        setData(response.data);
        } catch (error) {
        console.error(error);
        }
    };

    const onRefresh = () => {
        fetchData(); 
    };

    const onAdd = () => {
        navigation.navigate('NewPage');
    };

    return (
        <>
        <StatusBar barStyle="light-content" />
        <SafeAreaView style={styles.SafeAreaView}>
            <View style={styles.container}>
            <View style={styles.Header}>
                <Text style={styles.title}>Service Master</Text>
            </View>
            <FlatList style={styles.main}
                data={data}
                renderItem={({item}) => <Item name={item.name} title={item.title} description={item.description} />}
                keyExtractor={item => item.id}
            />
            <View style={styles.bottomBar}>
                <Button title="Add" onPress={onAdd} color="#2563EB" />
                <Button title="Refresh" onPress={onRefresh} color="#2563EB" />
            </View>
            </View>
        </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
  SafeAreaView: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: "#39445f",
  },
  container: {
    flex: 1,
    alignItems: "center",
  },
  Header: {
    width: "100%",
    height: 75,
    backgroundColor: "#475577",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    padding: 20,
    paddingTop: 25,
    color: "#fff",
  },
  main: {
    width: "100%",
    backgroundColor: "#E5E7EB", // added the background color to the FlatList
  },
  FlatListStyle: {
    backgroundColor: "#fff",
    margin: 10,
    padding: 15, // changed padding from 15 to 10
    borderRadius: 10, // added the borderRadius to round the corners
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
    width: "95%",
  },
  FlatListNameStyle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    paddingBottom: 5,
  },
  FlatListTitleStyle: {
    fontSize: 14,
    fontWeight: "200",
    color: "#2f3134",
    paddingBottom: 5,
  },
  FlatListDescriptionStyle: {
    fontSize: 16,
    color: "#000",
  },
  bottomBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#fff",
    padding: 10,
    paddingBottom: 30,
    width: "100%",
    borderTopWidth: 0.5,
    borderTopColor: "#bababa",
    shadowColor: '#575757',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
});
