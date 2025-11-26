import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useAuth } from '@/components/context/AuthContext';
import { useRouter } from 'expo-router';
import supabase from '../supabase.js';
import LoginScreen from '../login';

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const router = useRouter();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserName(user.email?.split('@')[0] || 'User');
        setIsLoggedIn(true);
      }
    };
    checkUser();
  }, []);

  // Logout
  async function handleLogout() {
    await supabase.auth.signOut();
    setIsLoggedIn(false);
    setUserName('');
  }

  if (!isLoggedIn) {
    return <LoginScreen />;
  }

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentInset={{ top: 16, bottom: 16 }}
      >
        {/* Header Section */}
        <ThemedView style={styles.headerSection}>
          <ThemedView style={styles.headerTop}>
            <ThemedText type="title" style={styles.headerTitle}>Hej Fredrik 🥇       </ThemedText>
            <TouchableOpacity onPress={() => router.push('/tabs/profile')}>
              <IconSymbol name="account_circle" size={28} color={colorScheme === 'dark' ? '#FFFFFF' : '#000000'} />
            </TouchableOpacity>
          </ThemedView>
        </ThemedView>

        {/* Main Buttons Section */}
        <ThemedView style={styles.section}>
          {/* Two main action buttons */}
          <ThemedView style={styles.mainActionButtons}>
            <TouchableOpacity style={[styles.mainActionButton, { backgroundColor: '#3B82F6' }]}>
              <IconSymbol name="quiz" size={32} color="white" weight="bold" />
              <ThemedText style={[styles.mainActionText, { color: 'white' }]}>Gör Quiz</ThemedText>
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.mainActionButton, { backgroundColor: '#10B981' }]}>
              <IconSymbol name="menu_book" size={32} color="white" weight="bold" />
              <ThemedText style={[styles.mainActionText, { color: 'white' }]}>Gör Prov</ThemedText>
            </TouchableOpacity>
          </ThemedView>
        </ThemedView>

        {/* Dagens mål Section */}
        <ThemedView style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>Dagens mål</ThemedText>
          
          {/* Individual learning cards */}
          {learningCards.map((card, index) => (
            <TouchableOpacity key={index} style={[styles.learningCard, { 
              backgroundColor: colorScheme === 'dark' ? 'rgba(45, 55, 72, 0.8)' : 'rgba(255, 255, 255, 0.8)',
              borderWidth: 1,
              borderColor: 'rgba(255, 255, 255, 0.5)'
            }]}>
              <View style={[styles.cardIconContainer, { backgroundColor: colorScheme === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.05)' }]}>
                <IconSymbol name={card.icon} size={24} color={card.iconColor} />
              </View>
              
              <View style={styles.cardContent}>
                <ThemedText type="defaultSemiBold" style={styles.cardTitle}>
                  {card.title}
                </ThemedText>
                <ThemedText style={styles.cardSubtitle}>
                  {card.subtitle}
                </ThemedText>
              </View>
              
              <View style={styles.progressContainer}>
                <View style={[styles.progressFill, { width: `${(card.progress || 0) * 100}%` }]} />
              </View>
            </TouchableOpacity>
          ))}
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
}

// Learning cards data
const learningCards = [
  {
    icon: 'quiz',
    iconColor: '#3B82F6',
    title: 'Quiz',
    subtitle: 'Fråga 4 ...',
    progress: 0.2
  },
  {
    icon: 'school',
    iconColor: '#10B981',
    title: 'Inlärning',
    subtitle: '',
    progress: 0.3
  },
  {
    icon: 'star',
    iconColor: '#F59E0B',
    title: 'Statiskik',
    subtitle: '',
    progress: 0.0
  },
  {
    icon: 'security',
    iconColor: '#f22828ff',
    title: 'Databasen',
    subtitle: '',
    progress: 0.1
  }
];

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  headerSection: {
    paddingHorizontal: 4,
    marginBottom: 24,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingHorizontal: 4,
    marginTop: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
  },
  // Section Styles
  section: { marginBottom: 24 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },

  // Main Action Buttons
  mainActionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    gap: 16,
  },
  mainActionButton: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  mainActionText: {
    marginTop: 8,
    fontWeight: '600',
    fontSize: 14,
  },

  // Learning Cards
  learningCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    backdropFilter: 'blur(10px)',
  },
  cardIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    opacity: 0.7,
  },
  progressContainer: {
    position: 'relative',
    width: 72,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(0, 0, 0, 0.12)',
    overflow: 'hidden',
    marginLeft: 12,
  },
  progressFill: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    backgroundColor: '#10B981',
    borderRadius: 2,
  },
})
