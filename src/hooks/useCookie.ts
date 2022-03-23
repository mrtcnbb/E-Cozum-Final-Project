import { useCookies } from 'react-cookie';

export default function useCookie() {
  const [cookies, setCookie, removeCookie] = useCookies(['token', 'username']);

  return [cookies, setCookie, removeCookie];
}
