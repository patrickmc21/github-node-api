import logger from './index';
import mockWinston, { mockWinstonLogger } from '../../Mocks/winston.mock';

jest.mock('winston', () => mockWinston);

describe("Logger || Unit Tests", () => {
  describe('#info()', () => {
    it("Calls loggingUtility.info with correct args", () => {
      const message = "This is a log!";
      logger.info(message);
      expect(mockWinstonLogger.info).toHaveBeenCalledWith(message);
    });
  });

  describe('#warn()', () => {
    it("Calls loggingUtility.warn with correct args", () => {
      const message = "This is a log!";
      logger.warn(message);
      expect(mockWinstonLogger.warn).toHaveBeenCalledWith(message);
    });
  });

  describe('#error()', () => {
    it("Calls loggingUtility.error with correct args", () => {
      const message = "This is a log!";
      const metadata = { error: { message: 'This is an error message!'}};
      logger.error(message);
      expect(mockWinstonLogger.error).toHaveBeenCalledWith(message, metadata);
    });
  });
});