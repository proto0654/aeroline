import { vi } from 'vitest';
import { config } from '@vue/test-utils';

// Глобальные моки для window объектов
global.fetch = vi.fn();

// Моки для console методов (опционально, для чистоты вывода)
// global.console = {
//   ...console,
//   log: vi.fn(),
//   warn: vi.fn(),
//   error: vi.fn(),
// };

// Настройка Vue Test Utils
config.global.stubs = {
  'AutocompleteInput': true,
  'TextInput': true,
  'SelectInput': true,
  'CheckboxInput': true,
  'TextareaInput': true,
  'DatePickerVue': true,
  'DateRangePickerVue': true,
};

