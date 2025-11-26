import { ScrollView, StyleSheet, TouchableOpacity, FlatList, View } from 'react-native';
import { useState } from 'react';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import { IconSymbol } from '@/components/ui/icon-symbol';

// Type definitions
type TrafficSign = {
  id: string;
  type: string;
  color: string;
  description: string;
  details: string;
  image: string;
};

type TrafficCategory = {
  category: string;
  categoryColor: string;
  signs: TrafficSign[];
};

// Traffic signs data with categories
const TRAFFIC_SIGNS_DATA: TrafficCategory[] = [
  {
    category: 'Förbudsskyltar',
    categoryColor: '#EF4444',
    signs: [
      {
        id: '1',
        type: 'no-entry',
        color: '#EF4444',
        description: 'Förbud mot infart med fordon',
        details: 'Denna skylt förbjuder all framkomst med fordon. Gäller för alla typer av fordon inklusive cyklar och motorfordon.',
        image: '🚫'
      },
      {
        id: '2',
        type: 'no-parking',
        color: '#EF4444',
        description: 'Förbud mot att parkera',
        details: 'Parkering är helt förbjuden i det markerade området. Gäller dygnet runt om inte annat anges.',
        image: '🅿️'
      },
      {
        id: '3',
        type: 'speed-limit',
        color: '#EF4444',
        description: 'Högst 30 km/h',
        details: 'Hastigheten får högst vara 30 kilometer per timme. Gäller tills nästa korsning eller ny hastighetsbegränsning.',
        image: '30'
      },
      {
        id: '4',
        type: 'no-turning',
        color: '#EF4444',
        description: 'Förbud mot vänstersväng',
        details: 'Vänstersväng är förbjuden vid denna korsning. Fortsätt rakt fram eller sväng höger.',
        image: '⬅️'
      }
    ]
  },
  {
    category: 'Varningsskyltar',
    categoryColor: '#F59E0B',
    signs: [
      {
        id: '5',
        type: 'curve',
        color: '#F59E0B',
        description: 'Väg med farlig kurva',
        details: 'Vägen har en farlig kurva framåt. Minska farten och var beredd att bromsa.',
        image: '🔄'
      },
      {
        id: '6',
        type: 'intersection',
        color: '#F59E0B',
        description: 'Vägkorsning',
        details: 'Varning för kommande vägkorsning. Var uppmärksam på annan trafik.',
        image: '🔀'
      },
      {
        id: '7',
        type: 'pedestrian',
        color: '#F59E0B',
        description: 'Område med mycket fotgängare',
        details: 'Fotgängarzoner med hög trafik. Minska farten och var extra uppmärksam.',
        image: '🚶'
      }
    ]
  },
  {
    category: 'Påbudsskyltar',
    categoryColor: '#3B82F6',
    signs: [
      {
        id: '8',
        type: 'mandatory-turn',
        color: '#3B82F6',
        description: 'Skyldig att svänga åt höger',
        details: 'Du måste svänga höger vid nästa korsning. Tvingande riktningsskylt.',
        image: '➡️'
      },
      {
        id: '9',
        type: 'roundabout',
        color: '#3B82F6',
        description: 'Köra med rundkörning',
        details: 'Rundkörning skyldig att hållas till höger. Ge väjningsplikt åt fordon från vänster.',
        image: '🔄'
      }
    ]
  }
];

export default function SkyltarScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [selectedSign, setSelectedSign] = useState<TrafficSign>(TRAFFIC_SIGNS_DATA[0].signs[0]);

  const renderCarouselItem = ({ item }: { item: TrafficSign }) => {
    return (
      <TouchableOpacity
        style={styles.carouselItem}
        onPress={() => setSelectedSign(item)}
      >
        <View
          style={[
            styles.signCard,
            {
              backgroundColor: colorScheme === 'dark' ? '#2D3748' : '#FFFFFF'
            }
          ]}
        >
          <View style={[styles.signCircle, { backgroundColor: item.color }]}>
            <ThemedText style={styles.signImage}>{item.image}</ThemedText>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderSignDetails = (sign: TrafficSign) => (
    <ThemedView style={styles.selectedSignContainer}>
      <ThemedText style={styles.signName}>{sign.description}</ThemedText>
      <ThemedText style={styles.signDescription}>{sign.details}</ThemedText>
    </ThemedView>
  );

  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <ThemedView style={styles.headerSection}>
        <ThemedView style={styles.headerTop}>
          <TouchableOpacity style={styles.backButton}>
            <IconSymbol name="chevron.left" size={24} color={colors.text} />
          </TouchableOpacity>
          <ThemedText type="title" style={styles.headerTitle}>Skyltar</ThemedText>
          <TouchableOpacity style={styles.searchButton}>
            <IconSymbol name="search" size={24} color={colors.text} />
          </TouchableOpacity>
        </ThemedView>
      </ThemedView>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {TRAFFIC_SIGNS_DATA.map((category: TrafficCategory, categoryIndex: number) => (
          <ThemedView key={categoryIndex} style={styles.categorySection}>
            {/* Category Header */}
            <ThemedView style={styles.categoryHeader}>
              <View style={[styles.categoryDot, { backgroundColor: category.categoryColor }]} />
              <ThemedText style={[styles.categoryTitle, { color: category.categoryColor }]}>
                {category.category}
              </ThemedText>
            </ThemedView>

            {/* Carousel */}
            <View style={styles.carouselContainer}>
              <FlatList
                data={category.signs}
                renderItem={renderCarouselItem}
                keyExtractor={(item: TrafficSign) => item.id}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.carouselContent}
              />
            </View>

            {/* Selected Sign Details */}
            <ThemedView style={styles.selectedSignContainer}>
              {renderSignDetails(selectedSign)}
            </ThemedView>

            {/* Category Divider */}
            {categoryIndex < TRAFFIC_SIGNS_DATA.length - 1 && (
              <View style={styles.categoryDivider} />
            )}
          </ThemedView>
        ))}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerSection: {
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 16,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backButton: {
    padding: 8,
    borderRadius: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    flex: 1,
  },
  searchButton: {
    padding: 8,
    borderRadius: 20,
  },
  content: {
    flex: 1,
  },
  categorySection: {
    marginBottom: 32,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  categoryDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  carouselContainer: {
    height: 200,
    marginBottom: 24,
  },
  carouselContent: {
    paddingHorizontal: 16,
  },
  carouselItem: {
    width: 140,
    height: '100%',
    paddingHorizontal: 8,
  },
  signCard: {
    flex: 1,
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  signCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  signImage: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  selectedSignContainer: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderRadius: 16,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  signName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  signDescription: {
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
  },
  categoryDivider: {
    height: 1,
    marginHorizontal: 16,
    marginTop: 32,
  },
});
