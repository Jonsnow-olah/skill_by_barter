import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveProfileData = async (data: {
  fullName: string;
  skillLearn: string;
  skillOffer: string;
  genderPreference: string;
}) => {
  try {
    await AsyncStorage.setItem("profileData", JSON.stringify(data));
  } catch (error) {
    console.error("Failed to save profile data:", error);
  }
};

export const getProfileData = async () => {
  try {
    const json = await AsyncStorage.getItem("profileData");
    return json ? JSON.parse(json) : null;
  } catch (error) {
    console.error("Failed to load profile data:", error);
    return null;
  }
};

export const clearProfileData = async () => {
  try {
    await AsyncStorage.removeItem("profileData");
  } catch (error) {
    console.error("Failed to clear profile data:", error);
  }
};
