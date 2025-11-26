import { ScrollView, StyleSheet, TouchableOpacity, Alert, TextInput } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import { useState } from 'react';
import { useAuth } from '@/components/context/AuthContext';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const { signIn, signUp } = useAuth();
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    if (!email || !password) {
      Alert.alert("Error", "Please enter email and password");
      return;
    }

    setLoading(true);
    try {
      await signIn(email, password);
      router.replace('/tabs');
    } catch (error: any) {
      Alert.alert("❌ Login failed", error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleRegister() {
    if (!email || !password) {
      Alert.alert("Error", "Please enter email and password");
      return;
    }

    if (password.length < 3) {
      Alert.alert("Error", "Password must be at least 3 characters");
      return;
    }

    setLoading(true);
    try {
      await signUp(email, password);
      Alert.alert("✅ Account created!", "You can now log in.");
      setEmail('');
      setPassword('');
    } catch (error: any) {
      Alert.alert("❌ Registration failed", error.message || "Please check your connection");
    } finally {
      setLoading(false);
    }
  }

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentInset={{ top: 16, bottom: 16 }}
      >
        <ThemedView style={styles.loginContainer}>
          <ThemedText type="title" style={styles.loginTitle}>Logga in</ThemedText>
          
          <TextInput
            style={[styles.input, { borderColor: colors.icon }]}
            placeholder="Email"
            placeholderTextColor={colors.icon}
            value={email}
            onChangeText={setEmail}
            editable={!loading}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          
          <TextInput
            style={[styles.input, { borderColor: colors.icon }]}
            placeholder="Lösenord"
            placeholderTextColor={colors.icon}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            editable={!loading}
          />
          
          <TouchableOpacity
            onPress={handleLogin}
            disabled={loading}
            style={[styles.button, { backgroundColor: '#3B82F6', opacity: loading ? 0.6 : 1 }]}
          >
            <ThemedText style={styles.buttonText}>
              {loading ? "Loggar in..." : "Logga in"}
            </ThemedText>
          </TouchableOpacity>
          
          <TouchableOpacity
            onPress={handleRegister}
            disabled={loading}
            style={[styles.button, { backgroundColor: '#10B981', opacity: loading ? 0.6 : 1 }]}
          >
            <ThemedText style={styles.buttonText}>
              {loading ? "Skapar konto..." : "Skapa konto"}
            </ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  loginContainer: {
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  loginTitle: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  button: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});
