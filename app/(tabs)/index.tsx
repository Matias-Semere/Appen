import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import { IconSymbol } from '@/components/ui/icon-symbol';

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <ThemedView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false} contentInset={{ top: 16, bottom: 16 }}>
        {/* Header */}
        <ThemedView style={styles.header}>
          <ThemedText type="title" style={styles.greeting}>Välkommen Fredrik ⭐</ThemedText>
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
          <TouchableOpacity style={[styles.userCard, { backgroundColor: colorScheme === 'dark' ? '#1E3A5F' : '#E8F5E9' }]}>
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
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 24,
  },
  greeting: {
    fontSize: 28,
    fontWeight: '700',
  },
  section: {
    marginBottom: 24,
  },
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
    backgroundColor: '#E8F5E9',
  },
  userInfo: {
    marginLeft: 12,
  },
  subtext: {
    fontSize: 12,
    opacity: 0.7,
  },
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
    paddingBottom: 0,
  },
  activityLabel: {
    marginTop: 8,
    fontWeight: '600',
    fontSize: 14,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
});

