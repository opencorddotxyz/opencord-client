import { NextApiRequest, NextApiResponse } from 'next';
import { notify } from '../../net/plugin';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { data, code, message = '', status } = await notify(req.body);

  res.status(status).json({
    data,
    message,
    code,
  });
}
