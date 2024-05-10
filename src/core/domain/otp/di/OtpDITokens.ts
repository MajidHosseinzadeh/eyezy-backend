export class OtpDITokens {

  // Use-cases

  public static readonly CreateOtpUseCase: unique symbol = Symbol('CreateOtpUseCase');
  public static readonly GetOtpUseCase: unique symbol = Symbol('GetOtpUseCase');

  // Repositories

  public static readonly OtpRepository: unique symbol = Symbol('OtpRepository');
  
}
