import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Animated,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import Toast from "react-native-toast-message";
import * as Haptics from "expo-haptics";

export default function AuthCodeScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const email = typeof params.email === "string" ? params.email : "";

  const correctCode = "1234";
  const inputRefs = useRef<TextInput[]>([]);
  const [code, setCode] = useState(["", "", "", ""]);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [headingText, setHeadingText] = useState(
    `We have sent a 4-digit code to your email at:\n${email}`
  );
  const shakeAnim = useRef(new Animated.Value(0)).current;

  const triggerShake = (isSuccess = false) => {
    Animated.sequence([
      Animated.timing(shakeAnim, {
        toValue: 10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: -10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: 6,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: 0,
        duration: 50,
        useNativeDriver: true,
      }),
    ]).start();

    setError(!isSuccess);
    setSuccess(isSuccess);
  };

  const handleChange = (text: string, index: number) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (text && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }

    if (!text && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    const enteredCode = newCode.join("");

    if (enteredCode.length === 4) {
      if (enteredCode === correctCode) {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        triggerShake(true);
        Toast.show({ type: "info", text1: "Login successful" });
        setTimeout(() => router.replace("/(tabs)"), 1000);
      } else {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        triggerShake(false);
        setHeadingText("Click resend code below to request for a new code");
        Toast.show({ type: "info", text1: "Incorrect code" });
      }
    }
  };

  const handleResend = () => {
    setHeadingText(`We have sent a new code to your email at:\n${email}`);
    Toast.show({
      type: "info",
      text1: `We have sent a new code to ${email}`,
    });
    setCode(["", "", "", ""]);
    inputRefs.current[0]?.focus();
    setError(false);
    setSuccess(false);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}
    >
      <Text style={styles.heading}>{headingText}</Text>

      <Animated.View
        style={[
          styles.codeRow,
          {
            transform: [{ translateX: shakeAnim }],
          },
        ]}
      >
        {code.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputRefs.current[index] = ref!)}
            value={digit}
            onChangeText={(text) => handleChange(text, index)}
            keyboardType="number-pad"
            maxLength={1}
            autoFocus={index === 0}
            style={[
              styles.codeInput,
              error && styles.errorInput,
              success && styles.successInput,
            ]}
          />
        ))}
      </Animated.View>

      {error && (
        <TouchableOpacity style={styles.resendBtn} onPress={handleResend}>
          <Text style={styles.resendText}>Resend Code</Text>
        </TouchableOpacity>
      )}

      <Toast
        config={{
          info: (props) => (
            <View style={styles.toastContainer}>
              <Text style={styles.toastText}>{props.text1}</Text>
            </View>
          ),
        }}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 24,
    color: "#444",
    fontWeight: "500",
    fontFamily: "Poppins-Regular"
  },
  codeRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  codeInput: {
    width: 60,
    height: 60,
    borderWidth: 2,
    borderColor: "#ccc",
    borderRadius: 12,
    fontSize: 24,
    textAlign: "center",
    backgroundColor: "#f9f9f9",
  },
  errorInput: {
    borderColor: "#f00",
    backgroundColor: "#ffe6e6",
  },
  successInput: {
    borderColor: "#4CAF50",
    backgroundColor: "#e6ffea",
  },
  resendBtn: {
    alignSelf: "center",
    marginTop: 10,
  },
  resendText: {
    color: "#d43c4f",
    fontWeight: "600",
    fontSize: 15,
  },
  toastContainer: {
    backgroundColor: "#333",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
    alignSelf: "center",
    marginTop: 50,
  },
  toastText: {
    color: "#fff",
    fontSize: 13,
  },
});
