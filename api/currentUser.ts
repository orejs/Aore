import { supabase, VercelRequestWithUser } from '../lib/auth';

const handler = supabase()((req: VercelRequestWithUser, res) => {
  if (req.method == 'GET') {
    res.send({
      success: true,
      data: req.auth,
    });
    return;
  }

  const { name = 'World' } = req.query;
  res.send(`Hello ${name}!`);
});

export default handler;
