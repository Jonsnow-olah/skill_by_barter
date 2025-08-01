import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import ConfettiCannon from "react-native-confetti-cannon";
import { useRouter } from "expo-router";
import { useOnboardingStore } from "@/app/store/onboarding";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { saveProfileData } from "../utils/storage";

export default function DonePage() {
  const router = useRouter();
  
  const {
    fullName,
    skillOffer,
    skillLearn,
    genderPreference
  } = useOnboardingStore();

  useEffect(() => {
    const profile = {
      fullName,
      skillOffer,
      skillLearn,
      genderPreference,
    };
    
    const setRedirectFlagAndNavigate = async () => {
      await AsyncStorage.setItem("showProfilePrompt", "true");
      saveProfileData(profile);
      setTimeout(() => {
        router.replace("/(tabs)");
      }, 2000);
    };

    setRedirectFlagAndNavigate();
  }, []);

  return (
    <View style={styles.container}>
      <ConfettiCannon count={100} origin={{ x: 200, y: -10 }} fadeOut />
      <Text style={styles.heading}>Awesome, you are all set 🎉</Text>
      <Text style={styles.subText}>Start exploring</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" },
  heading: { fontSize: 24, fontFamily: "Poppins-Bold", marginBottom: 10 },
  subText: { fontSize: 16, fontFamily: "Poppins-Regular", color: "#666" },
});
