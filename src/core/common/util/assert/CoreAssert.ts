import { Nullable, Optional } from '@core/common/type/CommonTypes';

export class CoreAssert {
  public static isTrue(expression: boolean, exception: Error): boolean {
    if (!expression) {
      throw exception;
    }
    return true
  }

  public static isFalse(expression: boolean, exception: Error): boolean {
    if (expression) {
      throw exception;
    }
    return true
  }

  public static notEmpty<T>(value: (T | null) | undefined, exception: Error): T {
    if (value === null || value === undefined) {
      throw exception;
    }
    return value;
  }
}
