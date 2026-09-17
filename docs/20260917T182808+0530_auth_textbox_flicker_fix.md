# Authentication textbox flicker fix

## Problem

Text fields on both Sign in and Create account visibly flickered when opened or focused on Android.

## Cause

The shared AuthField updated React state on every focus and blur. That state changed the field background, border color, icon color, and shadow at the same moment Android initialized the keyboard and autofill UI, causing a visible native-view repaint.

## Fix

- Removed focus/blur state from the shared authentication field.
- Kept the input background, border, icon, and elevation stable while focus changes.
- Preserved caller-provided focus and blur handlers without triggering a component-level visual redraw.
- Retained validation error borders, input behavior, accessibility labels, and keyboard/autofill configuration.

## File modified

- rontend/src/components/auth/AuthField.tsx

## Verification

- TypeScript typecheck passed.
- Focused ESLint passed.
- IDE diagnostics report no errors.
- Authentication tests passed (2/2).
- Diff whitespace validation passed.
