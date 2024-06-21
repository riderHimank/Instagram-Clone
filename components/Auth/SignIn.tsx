import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Button } from "@rneui/base";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { Formik } from "formik";
import * as Yup from "yup";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { router } from "expo-router";
import { ScrollView } from "react-native";
import { auth } from "../../firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const UserSignInSchema = Yup.object().shape({
  username: Yup.string()
    .email("Not A valid email")
    .required("Username is required"),
  password: Yup.string()
    .min(8, "Password is too short")
    .required("Password is required"),
});

const SignInForm = () => {
  const [visible, setVisible] = useState(false);
  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      validationSchema={UserSignInSchema}
      validateOnMount={true}
      onSubmit={(values) => onLogin(values.username, values.password)}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
        isValid,
      }) => (
        <View
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View>
            <Text style={styles.textStyles}>Usename *</Text>
            <TextInput
              placeholder="Enter your email"
              placeholderTextColor={"grey"}
              onChangeText={handleChange("username")}
              onBlur={handleBlur("username")}
              multiline={true}
              value={values.username}
              style={[
                styles.input,
                {
                  borderColor:
                    errors.username && touched.username ? "red" : "grey",
                  paddingTop: 10,
                },
              ]}
            />
          </View>
          {errors.username && touched.username && (
            <Text style={{ color: "red", marginBottom: 5 }}>
              {errors.username}
            </Text>
          )}
          <View style={styles.url}>
            <Text style={styles.textStyles}>Password *</Text>
            <TextInput
              placeholder="Enter your password"
              placeholderTextColor={"grey"}
              textContentType="password"
              secureTextEntry={visible ? false : true}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              style={[
                styles.input,
                {
                  borderColor:
                    errors.password && touched.password ? "red" : "grey",
                },
              ]}
            />
            <TouchableOpacity
              style={{ position: "absolute", right: 20, bottom: 20 }}
              onPress={() => setVisible(!visible)}
            >
              {visible ? (
                <FontAwesomeIcon icon={faEye} color="#fff" size={20} />
              ) : (
                <FontAwesomeIcon icon={faEyeSlash} color="#fff" size={20} />
              )}
            </TouchableOpacity>
          </View>
          {errors.password && touched.password && (
            <Text style={{ color: "red" }}>{errors.password}</Text>
          )}
          <TouchableOpacity>
            <Button
              onPress={(e) => handleSubmit()}
              title="LOG IN"
              disabled={!isValid}
              buttonStyle={{
                backgroundColor: "grey",
                width: 350,
                height: 50,
                borderRadius: 10,
                marginTop: 50,
              }}
            />
          </TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={styles.textStyles}>Don't have an account?</Text>
            <TouchableOpacity onPress={() => router.push("/signup")}>
              <Text style={{ color: "#0098ff" }}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </Formik>
  );
};

const onLogin = async (email: any, password: any) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    router.push("/home");
    Alert.alert("Logged In Successfully");
  } catch (error: any) {
    Alert.alert(error.message);
  }
};

const SignIn = () => {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ height: 100 }} />
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <FontAwesomeIcon icon={faInstagram} size={150} color="#fff" />
          <Text style={{ color: "#fff", fontSize: 30, fontWeight: 500 }}>
            LOG IN
          </Text>
        </View>
        <SignInForm />
        <View style={{ height: 300 }} />
      </ScrollView>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#000",
    rowGap: 40,
  },
  textStyles: {
    color: "#fff",
    margin: 5,
    fontSize: 15,
  },
  input: {
    width: 350,
    height: 50,
    color: "white",
    margin: 5,
    borderWidth: 1,
    borderColor: "grey",
    justifyContent: "flex-start",
    paddingLeft: 10,
    alignItems: "center",
    fontSize: 20,
    borderRadius: 10,
  },
  url: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    minHeight: 80,
  },
});
