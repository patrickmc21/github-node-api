import * as jsonwebtoken from 'jsonwebtoken';

class JsonWebToken {
  private static PRIVATE_KEY: string = process.env.JWT_KEY;
  private static DEFAULT_ALGORITHM: jsonwebtoken.Algorithm = 'RS256';

  sign(): string {
    return jsonwebtoken.sign({ data: Date.now() }, JsonWebToken.PRIVATE_KEY, {
      algorithm: JsonWebToken.DEFAULT_ALGORITHM,
      expiresIn: '1h',
    });
  }

  verify(token: string): boolean {
    try {
      jsonwebtoken.verify(token, JsonWebToken.PRIVATE_KEY);
      return true;
    } catch (error) {
      return false;
    }
  }
}

export default new JsonWebToken();
