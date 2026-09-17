import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useAppTheme } from '../../design/ThemeProvider';
import { radii, spacing, typography } from '../../design/tokens';
import { AppText, Heading } from '../ui/Primitives';

export type AuthBrandHeaderProps = {
  title: string;
  subtitle: string;
};

export function AuthBrandHeader({ title, subtitle }: AuthBrandHeaderProps) {
  const { colors } = useAppTheme();

  return (
    <View style={styles.container}>
      <View style={styles.brandRow}>
        <View
          style={[
            styles.mark,
            {
              backgroundColor: colors.primary,
              shadowColor: colors.primary,
            },
          ]}
        >
          <View style={styles.voiceBars}>
            <View style={[styles.voiceBar, styles.voiceBarShort]} />
            <View style={[styles.voiceBar, styles.voiceBarTall]} />
            <View style={[styles.voiceBar, styles.voiceBarMedium]} />
            <View style={[styles.voiceBar, styles.voiceBarTall]} />
            <View style={[styles.voiceBar, styles.voiceBarShort]} />
          </View>
        </View>
        <AppText style={[styles.brandName, { color: colors.textMuted }]}>
          VOICE ASSISTANT
        </AppText>
      </View>

      <Heading style={styles.title}>{title}</Heading>
      <AppText style={[styles.subtitle, { color: colors.textMuted }]}>
        {subtitle}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    marginBottom: spacing.lg,
  },
  brandRow: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: spacing.lg,
  },
  mark: {
    alignItems: 'center',
    borderRadius: radii.md,
    elevation: 5,
    height: 44,
    justifyContent: 'center',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.22,
    shadowRadius: 10,
    width: 44,
  },
  voiceBars: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 2,
    height: 20,
  },
  voiceBar: {
    backgroundColor: '#FFFFFF',
    borderRadius: radii.full,
    width: 2.5,
  },
  voiceBarShort: {
    height: 7,
  },
  voiceBarMedium: {
    height: 13,
  },
  voiceBarTall: {
    height: 19,
  },
  brandName: {
    fontSize: typography.labelSm,
    fontWeight: '700',
    letterSpacing: 1.8,
    marginLeft: spacing.sm,
  },
  title: {
    fontSize: typography.display,
    fontWeight: '700',
    letterSpacing: -0.9,
    lineHeight: typography.lineHeights.display,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: typography.body,
    lineHeight: typography.lineHeights.body,
    maxWidth: 360,
  },
});
