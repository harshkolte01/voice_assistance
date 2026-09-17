import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { useAppTheme } from '../../design/ThemeProvider';
import { radii, shadows, spacing } from '../../design/tokens';

export type AuthCardProps = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

export function AuthCard({ children, style }: AuthCardProps) {
  const { colors } = useAppTheme();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.surface,
          borderColor: colors.borderSubtle,
        },
        shadows.md,
        style,
      ]}
    >
      <View
        pointerEvents="none"
        style={[styles.accent, { backgroundColor: colors.primary }]}
      />
      <View
        pointerEvents="none"
        style={[
          styles.ambientGlow,
          { backgroundColor: colors.primaryContainer },
        ]}
      />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radii.lg,
    borderWidth: 1,
    elevation: 4,
    overflow: 'hidden',
    padding: spacing.lg,
    position: 'relative',
    width: '100%',
  },
  accent: {
    height: 3,
    left: spacing.lg,
    position: 'absolute',
    top: 0,
    width: 46,
  },
  ambientGlow: {
    borderRadius: radii.full,
    height: 110,
    opacity: 0.14,
    position: 'absolute',
    right: -48,
    top: -54,
    width: 110,
  },
});
