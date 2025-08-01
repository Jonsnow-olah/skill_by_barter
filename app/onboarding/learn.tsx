// app/onboarding/learn.tsx
import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useOnboardingStore } from "@/app/store/onboarding";

export default function LearnPage() {
  const router = useRouter();
  // const [skill, setSkill] = useState("");
  const { skillLearn, setSkillLearn} = useOnboardingStore();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="#333" />
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.heading}>What skill would you like to learn?</Text>
        <Text style={styles.subText}>Don’t worry, you can change this later</Text>

        <TextInput
          style={styles.input}
          placeholder="e.g. UI/UX Design, Public Speaking"
          value={skillLearn}
          onChangeText={(text) => setSkillLearn(text)}
        />

        <TouchableOpacity style={styles.nextBtn} onPress={() => router.push("/onboarding/gender")}>
          <Text style={styles.nextText}>Next</Text>
          <Ionicons name="arrow-forward" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  backBtn: { marginTop: 40 },
  content: { flex: 1, justifyContent: "center", alignItems: "center", paddingHorizontal: 10 },
  heading: { fontSize: 22, textAlign: "center", fontFamily: "Poppins-Bold", marginBottom: 10 },
  subText: { fontSize: 13, textAlign: "center", color: "#777", fontFamily: "Poppins-Regular", marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 44,
    width: "100%",
    fontSize: 16,
    marginBottom: 24,
  },
  nextBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#d43c4f",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 10,
  },
  nextText: { color: "#fff", fontSize: 16, fontWeight: "600", marginRight: 8 },
});
