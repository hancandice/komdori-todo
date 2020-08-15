import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
} from "react-native";
import { Dimensions } from "react-native";
import propTypes from "prop-types";

const { width, height } = Dimensions.get("window");

export default class ToDo extends Component {
  state = {
    isEditing: false,
    toDoValue: "",
  };

  static propTypes = {
    id: propTypes.string.isRequired,
    text: propTypes.string.isRequired,
    isCompleted: propTypes.bool.isRequired,
    deleteToDo: propTypes.func.isRequired,
    uncompleteToDo: propTypes.func.isRequired,
    completeToDo: propTypes.func.isRequired,
    updateToDo: propTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      toDoValue: props.text,
    };
  }

  _toggleComplete = () => {
    const { isCompleted, uncompleteToDo, completeToDo, id } = this.props;
    if (isCompleted) {
      uncompleteToDo(id);
    } else {
      completeToDo(id);
    }
  };

  _startEditing = () => {
    this.setState({
      isEditing: true,
    });
  };
  _controlInput = (text) => {
    this.setState({ toDoValue: text });
  };

  _finishEditing = () => {
    const { toDoValue } = this.state;
    const { id, updateToDo } = this.props;
    updateToDo(id, toDoValue);
    this.setState({
      isEditing: false,
    });
  };

  render() {
    const { isEditing, toDoValue } = this.state;
    const { text, id, deleteToDo, isCompleted } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.column}>
          <TouchableOpacity onPress={this._toggleComplete}>
            {isCompleted ? (
              <Image
                style={[styles.circle, styles.completedCircle]}
                source={require("./static/i-3.png")}
              ></Image>
            ) : (
              <Image
                style={[styles.circle, styles.uncompletedCircle]}
                source={require("./static/i-1.png")}
              ></Image>
            )}
          </TouchableOpacity>
          {isEditing ? (
            <TextInput
              style={[
                styles.text,
                styles.input,
                isCompleted ? styles.completedText : styles.uncompletedText,
              ]}
              value={toDoValue}
              multiline={true}
              onChange={(event) => this._controlInput(event.nativeEvent.text)}
              returnKeyType={"done"}
              onBlur={this._finishEditing}
            ></TextInput>
          ) : (
            <Text
              style={[
                styles.text,
                isCompleted ? styles.completedText : styles.uncompletedText,
              ]}
            >
              {text}
            </Text>
          )}
        </View>
        {isEditing ? (
          <View style={styles.actions}>
            <TouchableOpacity onPressOut={this._finishEditing}>
              <View style={styles.actionContainer}>
                <Text style={styles.actionText}>✅</Text>
              </View>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.actions}>
            <TouchableOpacity onPressOut={this._startEditing}>
              <View style={styles.actionContainer}>
                <Text style={styles.actionText}>✏️</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPressOut={(event) => {
                event.stopPropagation;
                deleteToDo(id);
              }}
            >
              <View style={styles.actionContainer}>
                <Text style={styles.actionText}>🔥</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: width - 60,
    borderBottomColor: "#bbb",
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: "row",
    alignItems: "center",
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  completedCircle: {},
  uncompletedCircle: {},

  text: {
    fontWeight: "600",
    fontSize: 20,
    marginVertical: 20,
  },
  completedText: {
    color: "#bbb",
    textDecorationLine: "line-through",
  },
  uncompletedText: {
    color: "#2c2c2c",
  },
  input: {
    marginTop: 15,
    width: width / 2,
  },
  column: {
    flex: 3,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: width / 2,
  },
  actions: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginLeft: 22,
  },
  actionContainer: {
    marginVertical: 10,
    marginHorizontal: 5,
  },

  actionText: {},
});
