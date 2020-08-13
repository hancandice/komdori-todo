import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export default class ToDo extends Component {
  state = {
    isEditing: false,
    isCompleted: false,
  };
  render() {
    const { isCompleted, isEditing } = this.state;
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
          <Text
            style={[
              styles.text,
              isCompleted ? styles.completedText : styles.uncompletedText,
            ]}
          >
            Going to the school
          </Text>
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
            <TouchableOpacity>
              <View style={styles.actionContainer}>
                <Text style={styles.actionText}>🔥</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }

  _toggleComplete = () => {
    this.setState((prevState) => {
      return {
        isCompleted: !prevState.isCompleted,
      };
    });
  };

  _startEditing = () => {
    this.setState({
      isEditing: true,
    });
  };

  _finishEditing = () => {
    this.setState({
      isEditing: false,
    });
  };
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
