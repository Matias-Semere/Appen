import { ScrollView, StyleSheet, TouchableOpacity, View, FlatList } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import { IconSymbol } from '@/components/ui/icon-symbol';

const TRAFFIC_SIGNS = [
  { id: '1', icon: 'info.circle.fill', color: '#3B82F6', label: 'Información' },
  { id: '2', icon: 'exclamationmark.triangle.fill', color: '#F59E0B', label: 'Precaución' },
  { id: '3', icon: 'triangle.fill', color: '#F59E0B', label: 'Advertencia' },
  { id: '4', icon: 'circle.slash', color: '#EF4444', label: 'Prohibido' },
  { id: '5', icon: 'line.horizontal.3', color: '#3B82F6', label: 'Señal' },
  { id: '6', icon: 'circle.fill', color: '#3B82F6', label: 'Obligatorio' },
  { id: '7', icon: 'circle.fill', color: '#3B82F6', label: 'Dirección' },
  { id: '8', icon: 'circle.fill', color: '#F59E0B', label: 'Precaución' },
  { id: '9', icon: 'line.horizontal.3.decrease', color: '#3B82F6', label: 'Control' },
  { id: '10', icon: 'circle.fill', color: '#EF4444', label: 'Parada' },
  { id: '11', icon: 'circle.fill', color: '#3B82F6', label: 'Ruta' },
  { id: '12', icon: 'line.horizontal.3', color: '#F59E0B', label: 'Tráfico' },
];

export default function SkyltarScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const renderSign = ({ item }: { item: typeof TRAFFIC_SIGNS[0] }) => (
    <TouchableOpacity style={styles.signItem}>
      <ThemedView style={[styles.signCircle, { backgroundColor: item.color }]}>
        <IconSymbol name={item.icon as any} size={40} color="white" />
      </ThemedView>
    </TouchableOpacity>
  );

  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <ThemedView style={styles.headerSection}>
        <ThemedView style={styles.headerTop}>
          <IconSymbol name="chevron.left" size={24} color={colors.text} />
          <ThemedText type="title" style={styles.headerTitle}>Skyltar</ThemedText>
          <IconSymbol name="line.horizontal.3" size={24} color={colors.text} />
        </ThemedView>

        {/* Filter Pills */}
        <ThemedView style={styles.filterContainer}>
          <TouchableOpacity style={[styles.filterPill, { backgroundColor: '#E0E7FF' }]}>
            <ThemedText style={{ color: '#000000ff', fontSize: 12 }}>Alla</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterPill}>
            <ThemedText style={{color: "#000000ff", fontSize: 12 }}>Vägar</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.filterPill, { backgroundColor: '#33a9edff' }]}>
            <ThemedText style={{color: "#000000ff", fontSize: 12 }}>Stad</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </ThemedView>

      {/* Traffic Signs Grid */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <FlatList
          scrollEnabled={false}
          data={TRAFFIC_SIGNS}
          renderItem={renderSign}
          keyExtractor={(item) => item.id}
          numColumns={3}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.signGrid}
        />
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
    paddingTop: 16,
    paddingBottom: 12,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
  },
  filterContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  filterPill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  signGrid: {
    paddingVertical: 12,
  },
  row: {
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  signItem: {
    alignItems: 'center',
    width: '30%',
  },
  signCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
