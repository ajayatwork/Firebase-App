import { Stack } from "expo-router";

export default function AuthLayouy() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="index"
        options={{
            headerTitle: "Login Screen",
            headerShown: true
        }}
      />
    </Stack>
  );
}
