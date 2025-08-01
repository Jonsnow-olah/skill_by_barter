import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useOnboardingStore } from "@/app/store/onboarding";

export default function SkillScreen() {
  const router = useRouter();
  const { name } = useLocalSearchParams<{ name: string }>();
  // const [skill, setSkill] = useState("");
  const { skillOffer, setSkillOffer} = useOnboardingStore();

  const handleNext = () => {
    if (!skillOffer) return;
    router.push({ pathname: "/onboarding/learn", params: { name } });
  };

  return (
    <View style={styles.container}>
      {/* Back button */}
      <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>

      {/* Progress bar */}
      <View style={styles.progressContainer}>
        <View style={[styles.progressDot, styles.activeDot]} />
        <View style={[styles.progressDot, styles.activeDot]} />
        <View style={styles.progressDot} />
        <View style={styles.progressDot} />
      </View>

      <View style={styles.content}>
        <Text style={styles.heading}>Which skill can you teach someone else?</Text>
        <Text style={styles.subText}>Don’t worry, you can change this later</Text>

        <TextInput
          style={styles.input}
          placeholder="e.g. Video editing, Copywriting"
          value={skillOffer}
          onChangeText={ (text) => setSkillOffer(text)}
        />

        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>Next</Text>
          <Ionicons name="arrow-forward" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 60,
  },
  backBtn: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 10,
  },
  progressContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  progressDot: {
    width: 30,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#eee",
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: "#d43c4f",
  },
  content: {
    alignItems: "center",
    paddingHorizontal: 24,
    justifyContent: "center",
    flex: 1,
  },
  heading: {
    fontSize: 20,
    fontFamily: "Poppins-Bold",
    marginBottom: 10,
    textAlign: "center",
  },
  subText: {
    fontSize: 14,
    color: "#777",
    marginBottom: 30,
    fontFamily: "Poppins-Regular",
    textAlign: "center",
  },
  input: {
    width: "100%",
    height: 48,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 16,
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    marginBottom: 30,
  },
  nextButton: {
    flexDirection: "row",
    backgroundColor: "#d43c4f",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
  },
  nextButtonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Poppins-Bold",
    marginRight: 8,
  },
});
