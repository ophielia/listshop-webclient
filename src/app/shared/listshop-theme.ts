import {definePreset} from '@primeuix/themes';
import Lara from '@primeuix/themes/lara';

// Keep the former Saga light theme's blue fields and orange list/plan switches.
// Dark mode is disabled at the provider to preserve the app's light-only design.
export const listshopTheme = definePreset(Lara, {
  semantic: {
    primary: {
      50: '{blue.50}', 100: '{blue.100}', 200: '{blue.200}',
      300: '{blue.300}', 400: '{blue.400}', 500: '{blue.500}',
      600: '{blue.600}', 700: '{blue.700}', 800: '{blue.800}',
      900: '{blue.900}', 950: '{blue.950}'
    }
  },
  components: {
    toggleswitch: {
      colorScheme: {
        light: {
          root: {checkedBackground: '#e67d21', checkedHoverBackground: '#e67d21'}
        }
      }
    }
  }
});
