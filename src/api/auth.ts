import Axios from "axios";

export interface AccessRefresh {
  access: string;
  refresh: string;
}

export class Auth {
  async login(email: string, password: string): Promise<AccessRefresh> {
    const { data } = await Axios.post<AccessRefresh>('http://localhost:6001/auth/login', {
      email, password
    });
    return data;
  }

  async refresh(token: string): Promise<AccessRefresh> {
    const { data } = await Axios.post<AccessRefresh>('http://localhost:6001/auth/refresh', {
      refresh: token
    });
    return data;
  }

  refreshOnTimer() {
    setInterval(async () => {
      try {
        console.log('refreshing token...')
        const { access, refresh } = await this.refresh(localStorage.getItem('refreshToken')!);
        localStorage.setItem('accessToken', access);
        localStorage.setItem('refreshToken', refresh);
      } catch (e) {
        console.log(e);
      }
    }, 9 * 60 * 1000)
  }
}