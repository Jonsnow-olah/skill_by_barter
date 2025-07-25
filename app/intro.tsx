// app/intro.tsx

import { View, StyleSheet, TouchableOpacity, Text, Image } from "react-native";
import { useRouter } from "expo-router";

type Props = { onFinish: () => void };

export default function IntroVideoScreen({ onFinish }: Props) {
  const router = useRouter();

  const handleStart = () => {
    console.log("Get Started tapped");
    onFinish();
    router.replace("/auth");
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/mammoth2.png")}
        style={StyleSheet.absoluteFillObject}
        resizeMode="cover"
      />
      <TouchableOpacity style={styles.button} onPress={handleStart}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  button: {
    position: "absolute",
    bottom: 80,
    alignSelf: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 30,
  },
  buttonText: {
    fontFamily: "Skripter",
    fontSize: 22,
    color: "#d43c4f",
  },
});
