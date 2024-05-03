import { RepositoryFindOptions } from '../../../../persistence/RepositoryOptions';

export class GetUserPreviewQuery {
  by: { phone: number };

  options?: RepositoryFindOptions;

  private constructor(by: { phone: number }, options?: RepositoryFindOptions) {
    this.by = by;
    this.options = options;
  }

  public static new(
    by: { phone: number },
    options?: RepositoryFindOptions,
  ): GetUserPreviewQuery {
    return new GetUserPreviewQuery(by, options);
  }
}
