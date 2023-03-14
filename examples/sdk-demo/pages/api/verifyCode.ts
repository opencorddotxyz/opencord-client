import { NextApiRequest, NextApiResponse } from 'next';
import { authCode } from '../../net/plugin';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { code: VerifyCode } = req.query;
  const {
    data,
    code = 200,
    message = '',
  } = await authCode({
    code: VerifyCode as string,
  });
  res.status(code).json({
    data,
    message,
    code,
  });
}
