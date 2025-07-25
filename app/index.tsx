// app/index.tsx
import { useEffect } from "react";
import { useRouter } from "expo-router";
import { View } from "react-native";

export default function IndexRedirect() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/auth");
    }, 0); // delay ensures the router is mounted

    return () => clearTimeout(timer);
  }, []);

  return <View />; // return an empty view instead of null to avoid any render issues
}

