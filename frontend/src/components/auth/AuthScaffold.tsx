import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useAppTheme } from '../../design/ThemeProvider';
import { spacing } from '../../design/tokens';
import { Screen } from '../ui/Primitives';

export type AuthScaffoldProps = {
  children: React.ReactNode;
  testID: string;
};

export function AuthScaffold({ children, testID }: AuthScaffoldProps) {
  const { colors } = useAppTheme();

  return (
    <Screen style={styles.screen} testID={testID}>
      <View
        pointerEvents="none"
        style={[
          styles.glow,
          styles.topGlow,
          { backgroundColor: colors.primaryContainer },
        ]}
      />
      <View
        pointerEvents="none"
        style={[
          styles.glow,
          styles.bottomGlow,
          { backgroundColor: colors.secondaryContainer },
        ]}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>{children}</View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    overflow: 'hidden',
    padding: 0,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    paddingBottom: spacing.xl,
    paddingTop: spacing.xl,
  },
  container: {
    alignSelf: 'center',
    maxWidth: 460,
    paddingHorizontal: spacing.lg,
    width: '100%',
  },
  glow: {
    borderRadius: 999,
    opacity: 0.32,
    position: 'absolute',
  },
  topGlow: {
    height: 260,
    right: -110,
    top: -130,
    width: 260,
  },
  bottomGlow: {
    bottom: -170,
    height: 300,
    left: -160,
    opacity: 0.2,
    width: 300,
  },
});
