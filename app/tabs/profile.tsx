import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import { useState, useEffect } from 'react';
import { Session, AuthChangeEvent } from '@supabase/supabase-js';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useRouter } from 'expo-router';
import supabase from '../supabase.js';

export default function ProfileScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get current user session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event: AuthChangeEvent, session: Session | null) => {
      setUser(session?.user);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Logout function
  async function handleLogout() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Logout error:', error);
      }
      // Redirect to login page after successful logout
      router.replace('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  }

  const menuItems = [
    { icon: 'person', title: 'Redigera profil', subtitle: 'Uppdatera dina uppgifter' },
    { icon: 'star', title: 'Mina favoriter', subtitle: 'Spara dina favoritfrågor' },
    { icon: 'access_time', title: 'Aktivitetshistorik', subtitle: 'Se din inlärningshistorik' },
    { icon: 'security', title: 'Säkerhetsinställningar', subtitle: 'Lösenord och sekretess' },
    { icon: 'notifications', title: 'Notifikationer', subtitle: 'Anpassa dina meddelanden' },
    { icon: 'color_lens', title: 'Färger', subtitle: 'Ändra färger på dina frågor' },
  ];

  if (loading) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>Loading...</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentInset={{ top: 16, bottom: 16 }}
      >
        {/* Profile Header */}
        <ThemedView style={styles.profileHeader}>
          <ThemedView style={styles.avatarContainer}>
            <ThemedView style={styles.avatar}>
              <ThemedText style={styles.avatarText}>
                {user?.email?.charAt(0)?.toUpperCase() || 'U'}
              </ThemedText>
            </ThemedView>
          </ThemedView>
          
          <ThemedView style={styles.userInfo}>
            <ThemedText type="title" style={styles.userName}>
              {/* {user?.email?.split('@')[0] || 'Användare'} */}
              { "M" + user?.email?.substring(1, user?.email?.indexOf('@')-9) || 'Användare'}
            </ThemedText>
            <ThemedText style={styles.userEmail}>
              {user?.email || ''}
            </ThemedText>
          </ThemedView>
        </ThemedView>

        {/* Profile Menu */}
        <ThemedView style={styles.menuSection}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.menuItem,
                { backgroundColor: colorScheme === 'dark' ? '#2D3748' : '#FFFFFF' }
              ]}
            >
              <View style={styles.menuIconContainer}>
                <IconSymbol name={item.icon as any} size={20} color="#3B82F6" />
              </View>
              
              <View style={styles.menuContent}>
                <ThemedText style={styles.menuTitle}>{item.title}</ThemedText>
                <ThemedText style={styles.menuSubtitle}>{item.subtitle}</ThemedText>
              </View>
              
              <IconSymbol name="chevron_right" size={20} color={colorScheme === 'dark' ? '#A0AEC0' : '#718096'} />
            </TouchableOpacity>
          ))}

          {/* Logout Button */}
          <TouchableOpacity
            onPress={handleLogout}
            style={[styles.logoutButton, { backgroundColor: '#EF4444' }]}
          >
            <View style={styles.logoutContent}>
              <IconSymbol name="logout" size={20} color="white" />
              <ThemedText style={[styles.logoutText, { color: 'white' }]}>
                Logga ut
              </ThemedText>
            </View>
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

  // Profile Header
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 24,
    marginBottom: 24,
  },
  avatarContainer: {
    marginRight: 16,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  userInfo: {},
  userName: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    opacity: 0.7,
  },

  // Menu Section
  menuSection: {
    gap: 12,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuIcon: {
    fontSize: 20,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  menuSubtitle: {
    fontSize: 14,
    opacity: 0.7,
  },
  menuArrow: {
    fontSize: 20,
    opacity: 0.5,
  },

  // Logout Button
  logoutButton: {
    marginTop: 24,
    borderRadius: 12,
    paddingVertical: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 44,
  },
  logoutContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  logoutText: {
    fontSize: 20,
    fontWeight: '600',
  },
});
