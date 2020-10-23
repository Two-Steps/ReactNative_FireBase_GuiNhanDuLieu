import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  FlatList,
} from "react-native";
import * as firebase from "firebase";

export default function App() {
  const [id, setid] = useState(null);
  const [username, setusername] = useState(null);
  const [password, setpassword] = useState(null);
  const [documentId, setdocumentId] = useState(null);

  var firebaseConfig = {
    apiKey: "AIzaSyBruC_oJTq0WWnnVP8EWAe1xYGgORnA-LE",
    authDomain: "now1-a4c82.firebaseapp.com",
    databaseURL: "https://now1-a4c82.firebaseio.com",
    projectId: "now1-a4c82",
    storageBucket: "now1-a4c82.appspot.com",
    messagingSenderId: "809748078497",
    appId: "1:809748078497:web:833209ed195992eec9b5e0",
    measurementId: "G-TPDC61BF69",
  };
  // Initialize Firebase
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  // ham post du lieu
  function storeNewUser(documentId, userId, name, password) {
    firebase
      .database()
      .ref("users/" + documentId)
      .set(
        {
          UserID: userId,
          Name: name,
          Password: password,
        },
        function (error) {
          if (error) {
            // The write failed...
            alert("Loi");
          } else {
            // Data saved successfully!
            alert("Thanh cong!!!");
          }
        }
      );
  }
  // ham get du lieu
  const [mdata, setmdata] = useState(null);
  let array = [];
  function readUserData() {
    firebase
      .database()
      .ref("users/")
      .on("value", function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
          var childData = childSnapshot.val();
          array.push({
            id: childSnapshot.key,
            userid: childData.UserID,
            name: childData.Name,
            password: childData.Password,
          });
        });
      });
    console.log(array);
  }
  // xoa
  function deleteData(documentId) {
    firebase
      .database()
      .ref("users/" + documentId)
      .remove();
  }
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.txtInput}
        placeholder="STT"
        onChangeText={(item) => {
          setdocumentId(item);
        }}
      />
      <TextInput
        style={styles.txtInput}
        placeholder="id"
        onChangeText={(item) => {
          setid(item);
        }}
      />
      <TextInput
        style={styles.txtInput}
        placeholder="username"
        onChangeText={(item) => {
          setusername(item);
        }}
      />
      <TextInput
        style={styles.txtInput}
        placeholder="password"
        onChangeText={(item) => {
          setpassword(item);
        }}
      />
      <View style={styles.allBtn}>
        <View style={styles.btn}>
          <Button
            title="Them"
            onPress={() => {
              storeNewUser(documentId, id, username, password);
            }}
          />
        </View>
        <View style={styles.btn}>
          <Button
            title="Sua"
            onPress={() => {
              storeNewUser(documentId, id, username, password);
            }}
          />
        </View>
        <View style={styles.btn}>
          <Button
            title="Xoa"
            onPress={() => {
              deleteData(documentId);
            }}
          />
        </View>
        <View style={styles.btn}>
          <Button
            title="Hien Thi"
            onPress={() => {
              readUserData();
              setmdata(array);
            }}
          />
        </View>
      </View>
      <FlatList
        style={styles.list}
        data={mdata}
        renderItem={({ item }) => (
          <Text style={styles.item}>
            STT: {item.id + "\n"}
            Id: {item.userid + "\n"}
            Name: {item.name + "\n"}
            Password: {item.password}
          </Text>
        )}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  txtInput: {
    borderColor: "#ccc",
    borderWidth: 2,
    padding: 5,
    color: "#000",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    width: 250,
  },
  allBtn: {
    flexDirection: "row",
    marginTop: 30,
  },
  btn: {
    marginLeft: 10,
  },
  list: {
    marginTop: 20,
  },
  item: {
    color: "#000",
    fontSize: 15,
    fontWeight: "bold",
    borderLeftColor: "#3b88ed",
    borderLeftWidth: 2,
    marginTop: 5,
    paddingLeft: 5
  },
});
