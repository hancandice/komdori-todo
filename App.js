import { StatusBar, Dimensions } from "react-native";
import React from "react";
import { StyleSheet, Text, View, Image, TextInput } from "react-native";
import { Platform } from "react-native";
import { ScrollView } from "react-native";
import ToDo from "./ToDo";

const { height, width } = Dimensions.get("window");

export default class App extends React.Component {
  state = {
    newToDo: "",
  };
  _controlNewToDo = (text) => {
    this.setState({
      newToDo: text,
    });
  };
  render() {
    const { newToDo } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content"></StatusBar>
        <View style={styles.title}>
          <Text style={styles.titleText}>Komdori Todo</Text>
          <Image
            style={styles.titleLogo}
            source={require("./static/i-2.png")}
          ></Image>
        </View>
        <View style={styles.card}>
          <TextInput
            style={styles.input}
            placeholder={"New To Do"}
            value={newToDo}
            onChangeText={this._controlNewToDo}
            placeholderTextColor={"#999"}
            returnKeyType={"done"}
          ></TextInput>
          <ScrollView style={styles.scrollView}>
            <ToDo></ToDo>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  title: {
    flexDirection: "row",
    marginTop: 50,
    marginBottom: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  titleLogo: {
    width: 70,
    height: 70,
  },
  titleText: {
    color: "white",
    fontSize: 40,
    fontWeight: "600",
  },
  card: {
    backgroundColor: "white",
    flex: 1,
    width: width - 30,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    ...Platform.select({
      ios: {
        shadowColor: "rgb(50,50,50)",
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowOffset: {
          height: -1,
          width: 0,
        },
      },
      android: {
        elevation: 3,
      },
    }),
  },
  input: {
    padding: 20,
    borderBottomColor: "#bbb",
    borderBottomWidth: 1,
    fontSize: 25,
  },
  scrollView: {
    paddingHorizontal: 15,
  },
});
