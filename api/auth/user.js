import { getLoginSession } from '../lib/auth';

export default async function user(req, res) {
  try {
    const session = await getLoginSession(req);
    res.status(200).json({ user: session || null, loggedIn: !!session });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Authentication token is invalid, please log in' });
  }
}