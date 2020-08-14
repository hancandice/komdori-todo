import React from "react";
import { StatusBar, Dimensions } from "react-native";
import { Platform } from "react-native";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { AppLoading } from "expo";
import uuid from "react-native-uuid";
import ToDo from "./ToDo";

const { height, width } = Dimensions.get("window");

export default class App extends React.Component {
  state = {
    newToDo: "",
    loadedToDos: false,
    toDos: {},
  };

  _loadToDos = () => {
    this.setState({ loadedToDos: true });
  };

  _controlNewToDo = (text) => {
    this.setState({
      newToDo: text,
    });
  };

  _addToDo = () => {
    const { newToDo } = this.state;
    if (newToDo !== "") {
      this.setState((prevState) => {
        const ID = uuid.v1();
        const newToDoObject = {
          [ID]: {
            id: ID,
            isCompleted: false,
            text: newToDo,
            createAt: Date.now(),
          },
        };
        const newState = {
          ...prevState,
          newToDo: "",
          toDos: {
            ...prevState.toDos,
            ...newToDoObject,
          },
        };
        return { ...newState };
      });
    }
  };

  _deleteToDo = (id) => {
    this.setState((prevState) => {
      const toDos = prevState.toDos;
      delete toDos[id];
      const newState = {
        ...prevState,
        ...toDos,
      };
      return { ...newState };
    });
  };

  _uncompleteToDo = (id) => {
    this.setState((prevState) => {
      const newState = {
        ...prevState,
        toDos: {
          ...prevState.toDos,
          [id]: {
            ...prevState.toDos[id],
            isCompleted: false,
          },
        },
      };
      return { ...newState };
    });
  };

  _completeToDo = (id) => {
    this.setState((prevState) => {
      const newState = {
        ...prevState,
        toDos: {
          ...prevState.toDos,
          [id]: {
            ...prevState.toDos[id],
            isCompleted: true,
          },
        },
      };
      return { ...newState };
    });
  };

  _updateToDo = (id, text) => {
    this.setState((prevState) => {
      const newState = {
        ...prevState,
        toDos: {
          ...prevState.toDos,
          [id]: {
            ...prevState.toDos[id],
            text: text,
          },
        },
      };
      return { ...newState };
    });
  };

  componentDidMount = () => {
    this._loadToDos();
  };

  render() {
    const { newToDo, loadedToDos, toDos } = this.state;

    if (!loadedToDos) {
      return <AppLoading />;
    }

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
            autoCorrect={false}
            onSubmitEditing={this._addToDo}
          ></TextInput>
          <ScrollView style={styles.scrollView}>
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : null}
              keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
            >
              {Object.values(toDos).map((toDo) => (
                <ToDo
                  key={toDo.id}
                  {...toDo}
                  deleteToDo={this._deleteToDo}
                  uncompleteToDo={this._uncompleteToDo}
                  completeToDo={this._completeToDo}
                  updateToDo={this._updateToDo}
                />
              ))}
            </KeyboardAvoidingView>
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
