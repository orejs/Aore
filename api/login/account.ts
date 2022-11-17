import type { VercelRequest, VercelResponse } from '@vercel/node';
import jwt from 'jsonwebtoken';

export default function (req: VercelRequest, res: VercelResponse) {
  if (req.method == 'POST') {
    const { username } = req.body;
    const user = { username, access: 'admin' };
    const token = 'Bearer ' + jwt.sign(user, process.env.SECRET!, { expiresIn: 3600 * 24 * 3 });
    res.json({ status: 'ok', currentAuthority: 'admin', token });
    return;
  }

  const { name = 'World' } = req.query;
  res.send(`Hello ${name}!`);
}
