import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useState } from 'react';

const LANGUAGES = [
  { id: '1', name: 'Svenska', code: 'sv', flag: '🇸🇪' },
  { id: '2', name: 'Engelska', code: 'en', flag: '🇬🇧' },
  { id: '3', name: 'Tigrinja', code: 'ti', flag: '🇪🇷' },
];

export default function LanguageScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [selectedLanguage, setSelectedLanguage] = useState('sv');

  return (
    <ThemedView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <ThemedView style={styles.header}>
          <IconSymbol name="chevron.left" size={24} color={colors.text} />
          <ThemedText type="title" style={styles.headerTitle}>Språkval</ThemedText>
          <View style={{ width: 24 }} />
        </ThemedView>

        {/* Language Description */}
        <ThemedView style={styles.descriptionContainer}>
          <ThemedText style={styles.description}>
            Välj vilket språk du vill använda appen på
          </ThemedText>
        </ThemedView>

        {/* Language Options */}
        <ThemedView style={styles.languageList}>
          {LANGUAGES.map((language) => (
            <TouchableOpacity
              key={language.id}
              onPress={() => setSelectedLanguage(language.code)}
              style={[
                styles.languageCard,
                {
                  backgroundColor:
                    colorScheme === 'dark' ? 
                    selectedLanguage === language.code
                        ? '#1E3A8A'
                        : '#2D3748'
                      : selectedLanguage === language.code
                        ? '#EFF6FF'
                        : '#F9FAFB',
                  borderColor: selectedLanguage === language.code ? '#3B82F6' : 'transparent',
                  borderWidth: selectedLanguage === language.code ? 2 : 1,
                },
              ]}>
              <ThemedView style={styles.languageContent}>
                <ThemedText style={styles.flag}>{language.flag}</ThemedText>
                <ThemedView style={styles.languageInfo}>
                  <ThemedText type="defaultSemiBold" style={styles.languageName}>
                    {language.name}
                  </ThemedText>
                  <ThemedText style={styles.languageCode}>{language.code.toUpperCase()}</ThemedText>
                </ThemedView>
              </ThemedView>
              {selectedLanguage === language.code && (
                <IconSymbol name="checkmark.circle.fill" size={24} color="#3B82F6" />
              )}
            </TouchableOpacity>
          ))}
        </ThemedView>

        {/* Continue Button */}
        <ThemedView style={styles.buttonContainer}>
          <TouchableOpacity style={styles.continueButton}>
            <ThemedText style={styles.buttonText}>Fortsätt</ThemedText>
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
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
  },
  descriptionContainer: {
    marginBottom: 24,
  },
  description: {
    fontSize: 16,
    opacity: 0.7,
    lineHeight: 22,
  },
  languageList: {
    gap: 12,
    marginBottom: 32,
  },
  languageCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  languageContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  flag: {
    fontSize: 32,
    marginRight: 16,
  },
  languageInfo: {
    flex: 1,
  },
  languageName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  languageCode: {
    fontSize: 12,
    opacity: 0.6,
  },
  buttonContainer: {
    marginBottom: 24,
  },
  continueButton: {
    backgroundColor: '#3B82F6',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});
