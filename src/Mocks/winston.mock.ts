class MockConsole {
}

export const mockWinstonLogger = {
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn()
}

export default {
  createLogger: () => mockWinstonLogger,
  transports: {
    Console: MockConsole
  },
  format: {
    combine: jest.fn(),
    colorize: jest.fn(),
    timestamp: jest.fn(),
    printf: jest.fn()
  }
};
