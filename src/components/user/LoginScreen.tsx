import React, { useContext, useState } from "react";
import { View, Text, Button, TextInput, StyleSheet } from "react-native";
import AppContext from "../../AppContext";

export default function LoginScreen() {
  const { userRepository } = useContext(AppContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const res = await userRepository.loginWithEmailAndPassword(email, password)
  } 

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
     paddingTop: 23
  },
  input: {
     margin: 15,
     height: 40,
     borderColor: '#7a42f4',
     borderWidth: 1
  },
  submitButton: {
     backgroundColor: '#7a42f4',
     padding: 10,
     margin: 15,
     height: 40,
  },
  submitButtonText:{
     color: 'white'
  }
})