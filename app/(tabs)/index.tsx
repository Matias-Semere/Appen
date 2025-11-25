import { ScrollView, StyleSheet, TouchableOpacity, View, Alert, TextInput } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useState } from 'react';
import supabase from './supabase'; // Import your Supabase client

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // 🔐 Login function (Supabase)
  async function handleLogin() {
    if (!email || !password) {
      Alert.alert("Error", "Please enter email and password");
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) {
        Alert.alert("❌ Login failed", error.message);
        setLoading(false);
        return;
      }
      
      // Fetch user data from Supabase (optional, for displaying user's name, etc.)
      const user = data.user;
      setUserName(user?.email?.split('@')[0] || 'User'); // Using email as username for example
      setIsLoggedIn(true);
      setEmail('');
      setPassword('');
      Alert.alert("✅ Login successful!", `Welcome ${userName}!`);
    } catch (error: any) {
      console.error("Login error:", error);
      Alert.alert("Error", "Login failed");
    } finally {
      setLoading(false);
    }
  }

  // 🔐 Register function (Supabase)
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
      // Check if user already exists by email (Supabase handles this check)
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        Alert.alert("Error", error.message);
        setLoading(false);
        return;
      }

      Alert.alert("✅ Account created!", "You can now log in.");
      setEmail('');
      setPassword('');
    } catch (error: any) {
      console.error("Register error:", error);
      Alert.alert("❌ Registration failed", error?.message || "Please check your connection");
    } finally {
      setLoading(false);
    }
  }

  // Logout
  async function handleLogout() {
    await supabase.auth.signOut();
    setIsLoggedIn(false);
    setUserName('');
    setEmail('');
    setPassword('');
  }

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentInset={{ top: 16, bottom: 16 }}
      >
        {/* Login/Home Screen */}
        {!isLoggedIn ? (
          <ThemedView style={styles.loginContainer}>
            <ThemedText type="title" style={styles.loginTitle}>Logga in</ThemedText>
            
            {/* Email Input */}
            <TextInput
              style={[styles.input, { borderColor: colors.icon }]}
              placeholder="Email"
              placeholderTextColor={colors.icon}
              value={email}
              onChangeText={setEmail}
              editable={!loading}
            />
            
            {/* Password Input */}
            <TextInput
              style={[styles.input, { borderColor: colors.icon }]}
              placeholder="Lösenord"
              placeholderTextColor={colors.icon}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              editable={!loading}
            />
            
            {/* Login Button */}
            <TouchableOpacity
              onPress={handleLogin}
              disabled={loading}
              style={[styles.button, { backgroundColor: '#3B82F6', opacity: loading ? 0.6 : 1 }]}
            >
              <ThemedText style={styles.buttonText}>
                {loading ? "Loggar in..." : "Logga in"}
              </ThemedText>
            </TouchableOpacity>
            
            {/* Register Button */}
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
        ) : (
          // Home screen when logged in
          <>
            {/* Logout Button */}
            <TouchableOpacity
              onPress={handleLogout}
              style={[styles.button, { backgroundColor: '#EF4444', marginBottom: 20 }]}
            >
              <ThemedText style={styles.buttonText}>Logga ut</ThemedText>
            </TouchableOpacity>

            {/* Header */}
            <ThemedView style={styles.header}>
              <ThemedText type="title" style={styles.greeting}>Välkommen {userName} ⭐</ThemedText>
            </ThemedView>

            {/* Dagens mål */}
            <ThemedView style={styles.section}>
              <ThemedText type="subtitle" style={styles.sectionTitle}>Dagens mål</ThemedText>

              <TouchableOpacity style={[styles.goalCard, { backgroundColor: '#FF6B6B' }]}>
                <IconSymbol name="film.fill" size={20} color="white" />
                <ThemedText style={styles.goalText}>Öva med videos</ThemedText>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.goalCard, { backgroundColor: '#FFD93D' }]}>
                <IconSymbol name="star.fill" size={20} color="white" />
                <ThemedText style={[styles.goalText, { color: 'white' }]}>Vägskyltar</ThemedText>
              </TouchableOpacity>
            </ThemedView>

            {/* Fortsätt där du slutade */}
            <ThemedView style={styles.section}>
              <ThemedText type="subtitle" style={styles.sectionTitle}>Fortsätt där du slutade</ThemedText>
              <TouchableOpacity
                style={[
                  styles.userCard,
                  { backgroundColor: colorScheme === 'dark' ? '#1E3A5F' : '#E8F5E9' }
                ]}
              >
                <IconSymbol name="star.fill" size={28} color="#0a7ea4" />
                <View style={styles.userInfo}>
                  <ThemedText type="defaultSemiBold">Quiz fråga 3</ThemedText>
                  <ThemedText style={styles.subtext}>vad innebär detta vägmärke?</ThemedText>
                </View>
              </TouchableOpacity>
            </ThemedView>

            {/* Activity Cards */}
            <ThemedView style={styles.activityGrid}>
              <TouchableOpacity style={[styles.activityCard, { backgroundColor: '#1E88E5' }]}>
                <IconSymbol name="questionmark.circle.fill" size={32} color="white" />
                <ThemedText style={[styles.activityLabel, { color: 'white' }]}>Quiz</ThemedText>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.activityCard, { backgroundColor: '#FFD93D' }]}>
                <IconSymbol name="binoculars.fill" size={32} color="white" />
                <ThemedText style={[styles.activityLabel, { color: 'white' }]}>Vägskyltar</ThemedText>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.activityCard, { backgroundColor: '#FF9F43' }]}>
                <IconSymbol name="play.circle.fill" size={32} color="white" />
                <ThemedText style={[styles.activityLabel, { color: 'white' }]}>Prov</ThemedText>
              </TouchableOpacity>
            </ThemedView>
          </>
        )}

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
  
  // Login Styles
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
  
  // Home Screen Styles
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  greeting: {
    fontSize: 28,
    fontWeight: '700',
  },
  section: { marginBottom: 24 },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  goalCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  goalText: {
    marginLeft: 12,
    fontWeight: '500',
    color: 'white',
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  userInfo: { marginLeft: 12 },
  subtext: { fontSize: 12, opacity: 0.7 },
  activityGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  activityCard: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 6,
    paddingBottom: 8,
  },
  activityLabel: {
    marginTop: 8,
    fontWeight: '600',
    fontSize: 14,
  },
});
