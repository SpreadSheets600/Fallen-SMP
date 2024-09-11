import Iron from '@hapi/iron';
import { parse, serialize } from 'cookie';

const TOKEN_NAME = 'token';
const MAX_AGE = 60 * 60 * 8; // 8 hours

export async function setLoginSession(res, session) {
  const createdAt = Date.now();
  const obj = { ...session, createdAt, maxAge: MAX_AGE };
  const token = await Iron.seal(obj, process.env.TOKEN_SECRET, Iron.defaults);

  const cookie = serialize(TOKEN_NAME, token, {
    maxAge: MAX_AGE,
    expires: new Date(Date.now() + MAX_AGE * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    sameSite: 'lax',
  });

  res.setHeader('Set-Cookie', cookie);
}

export async function getLoginSession(req) {
  const cookie = req.headers.cookie ? parse(req.headers.cookie) : null;
  const token = cookie && cookie[TOKEN_NAME] ? cookie[TOKEN_NAME] : null;

  if (!token) return;

  const session = await Iron.unseal(token, process.env.TOKEN_SECRET, Iron.defaults);
  const expiresAt = session.createdAt + session.maxAge * 1000;

  if (Date.now() > expiresAt) {
    throw new Error('Session expired');
  }

  return session;
}

export function removeTokenCookie(res) {
  const cookie = serialize(TOKEN_NAME, '', {
    maxAge: -1,
    path: '/',
  });

  res.setHeader('Set-Cookie', cookie);
}