import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#3B82F6', // Blue color for active tab
        tabBarInactiveTintColor: Colors[colorScheme ?? 'light'].icon,
        tabBarStyle: {
          backgroundColor: colorScheme === 'dark' ? '#1A202C' : '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: colorScheme === 'dark' ? '#2D3748' : '#E2E8F0',
          paddingBottom: 8,
          paddingTop: 8,
          height: 64,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          marginTop: 4,
        },
        tabBarShowLabel: true, // Show tab labels at bottom
        headerShown: false,
        tabBarButton: HapticTab,
      }}
      >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Hem',
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol 
              size={24} 
              name="house.fill" 
              color={focused ? '#3B82F6' : color} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Lära',
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol 
              size={24} 
              name="school" 
              color={focused ? '#3B82F6' : color} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="language"
        options={{
          title: 'Språk',
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol 
              size={24} 
              name="language" 
              color={focused ? '#3B82F6' : color} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profil',
          tabBarIcon: ({ color, focused }) => (
            <IconSymbol 
              size={24} 
              name="person" 
              color={focused ? '#3B82F6' : color} 
            />
          ),
        }}
      />
    </Tabs>
  );
}
