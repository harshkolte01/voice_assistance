# Registration name input stability fix

## Problem

Focusing the Name input on the Create account screen caused the form and input text to move vertically as the Android keyboard resized the available viewport, making the field difficult to use.

## Changes

- Changed the shared authentication scroll layout from vertically centered to top-anchored so keyboard resize does not recalculate a new centered position.
- Added stable top padding for both authentication screens.
- Set authentication text inputs to a fixed height with zero vertical padding.
- Added Android-specific font-padding removal and explicit vertical text centering.

## Files modified

- rontend/src/components/auth/AuthScaffold.tsx
- rontend/src/components/auth/AuthField.tsx

## Verification

- TypeScript typecheck passed.
- Focused ESLint passed.
- Authentication registration/navigation tests passed (2/2).
