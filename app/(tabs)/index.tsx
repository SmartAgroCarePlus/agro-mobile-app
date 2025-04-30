import { Link } from "expo-router";
import React from "react";
import { Text, View, StyleSheet } from "react-native";

export default function Index() {
  return (
    <View
      style= {styles.container}
    >
      <Text style={styles.text}>Smart Agro Care</Text>
      <Link href="/about" style={styles.button}>
        Go to About screen
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#649863",
    alignItems: "center",
    justifyContent: "center",
  },
  text:{
    color: "#fff",
    fontSize: 20,
  },
  button: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: '#fff',
  },
});
 
 