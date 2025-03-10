class AuthSession {
  private _accessToken: string | null = null;

  public get accessToken(): string | null {
    return this._accessToken;
  }

  public set accessToken(accessToken: string | null) {
    this._accessToken = accessToken;
  }

  public get isLoggedIn(): boolean {
    return !!this._accessToken;
  }
}

export const authSessionInstance = new AuthSession();
