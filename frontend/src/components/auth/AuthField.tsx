import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';
import { useAppTheme } from '../../design/ThemeProvider';
import { radii, spacing, typography } from '../../design/tokens';

export type AuthFieldIcon = 'email' | 'lock' | 'person';

export type AuthFieldProps = TextInputProps & {
  label: string;
  icon?: AuthFieldIcon;
  rightElement?: React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  error?: string | null;
};

function FieldIcon({ type, color }: { type: AuthFieldIcon; color: string }) {
  if (type === 'email') {
    return (
      <View style={[styles.emailIcon, { borderColor: color }]}>
        <View
          style={[
            styles.emailFlap,
            { borderBottomColor: color, borderRightColor: color },
          ]}
        />
      </View>
    );
  }

  if (type === 'person') {
    return (
      <View style={styles.personIcon}>
        <View style={[styles.personHead, { borderColor: color }]} />
        <View style={[styles.personBody, { borderColor: color }]} />
      </View>
    );
  }

  return (
    <View style={styles.lockIcon}>
      <View style={[styles.lockShackle, { borderColor: color }]} />
      <View style={[styles.lockBody, { borderColor: color }]} />
    </View>
  );
}

export function AuthField({
  label,
  icon,
  rightElement,
  containerStyle,
  error,
  style,
  onFocus,
  onBlur,
  ...inputProps
}: AuthFieldProps) {
  const { colors } = useAppTheme();
  return (
    <View style={[styles.wrapper, containerStyle]}>
      <Text style={[styles.label, { color: colors.textMuted }]}>{label}</Text>

      <View
        style={[
          styles.inputContainer,
          {
            backgroundColor: colors.surfaceLow,
            borderColor: error ? colors.error : colors.borderSubtle,
          },
        ]}
      >
        {icon ? (
          <View style={styles.iconContainer}>
            <FieldIcon color={colors.textSubtle} type={icon} />
          </View>
        ) : null}

        <TextInput
          {...inputProps}
          onBlur={onBlur}
          onFocus={onFocus}
          placeholderTextColor={colors.textSubtle}
          selectionColor={colors.primary}
          textAlignVertical="center"
          style={[
            styles.textInput,
            { color: colors.text },
            icon ? styles.textInputWithIcon : null,
            rightElement ? styles.textInputWithRight : null,
            style,
          ]}
        />

        {rightElement ? (
          <View style={styles.rightContainer}>{rightElement}</View>
        ) : null}
      </View>

      {error ? (
        <Text style={[styles.errorText, { color: colors.error }]}>{error}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: spacing.md,
  },
  label: {
    fontSize: typography.label,
    fontWeight: '600',
    marginBottom: spacing.sm,
  },
  inputContainer: {
    alignItems: 'center',
    borderRadius: radii.md,
    borderWidth: 1.5,
    flexDirection: 'row',
    minHeight: 54,
    position: 'relative',
  },
  iconContainer: {
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'center',
    marginLeft: spacing.md,
    width: 20,
  },
  textInput: {
    flex: 1,
    fontSize: typography.body,
    height: 52,
    includeFontPadding: false,
    paddingHorizontal: spacing.md,
    paddingVertical: 0,
  },
  textInputWithIcon: {
    paddingLeft: spacing.sm,
  },
  textInputWithRight: {
    paddingRight: spacing.xs,
  },
  rightContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: spacing.sm,
  },
  errorText: {
    fontSize: typography.caption,
    marginTop: spacing.xs,
  },
  emailIcon: {
    borderRadius: 3,
    borderWidth: 1.7,
    height: 14,
    overflow: 'hidden',
    position: 'relative',
    width: 18,
  },
  emailFlap: {
    borderBottomWidth: 1.4,
    borderRightWidth: 1.4,
    height: 11,
    left: 2,
    position: 'absolute',
    top: -6,
    transform: [{ rotate: '45deg' }],
    width: 11,
  },
  personIcon: {
    alignItems: 'center',
    height: 20,
    justifyContent: 'flex-end',
    width: 20,
  },
  personHead: {
    borderRadius: radii.full,
    borderWidth: 1.7,
    height: 7,
    position: 'absolute',
    top: 1,
    width: 7,
  },
  personBody: {
    borderBottomWidth: 0,
    borderRadius: 7,
    borderWidth: 1.7,
    height: 9,
    width: 15,
  },
  lockIcon: {
    alignItems: 'center',
    height: 20,
    justifyContent: 'flex-end',
    width: 20,
  },
  lockShackle: {
    borderBottomWidth: 0,
    borderRadius: 6,
    borderWidth: 1.7,
    height: 9,
    position: 'absolute',
    top: 1,
    width: 11,
  },
  lockBody: {
    borderRadius: 3,
    borderWidth: 1.7,
    height: 10,
    width: 16,
  },
});
