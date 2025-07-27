// app/onboarding/gender.tsx
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function GenderPreference() {
  const router = useRouter();
  const [selected, setSelected] = useState("");

  const handleFinish = () => {
    router.push("/onboarding/done");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="#333" />
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.heading}>Which type of tutors would you prefer?</Text>
        <Text style={styles.subText}>You can always change this later</Text>

        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={[styles.optionBtn, selected === "Male" && styles.selectedBtn]}
            onPress={() => setSelected("Male")}
          >
            <Text style={styles.optionText}>Male</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.optionBtn, selected === "Female" && styles.selectedBtn]}
            onPress={() => setSelected("Female")}
          >
            <Text style={styles.optionText}>Female</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.finishBtn} onPress={handleFinish}>
          <Text style={styles.finishText}>Finish</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  backBtn: { marginTop: 40 },
  content: { flex: 1, justifyContent: "center", alignItems: "center" },
  heading: { fontSize: 22, textAlign: "center", fontFamily: "Poppins-Bold", marginBottom: 10 },
  subText: { fontSize: 13, color: "#777", fontFamily: "Poppins-Regular", textAlign: "center", marginBottom: 20 },
  buttonGroup: { flexDirection: "row", gap: 16, marginBottom: 30 },
  optionBtn: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
  },
  selectedBtn: { backgroundColor: "#d43c4f", borderColor: "#d43c4f" },
  optionText: { color: "#333", fontFamily: "Poppins-Regular" },
  finishBtn: {
    backgroundColor: "#d43c4f",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 10,
  },
  finishText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
