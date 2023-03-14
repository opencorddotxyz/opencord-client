import { NextApiRequest, NextApiResponse } from 'next';
import { validateChannelPermissions } from '../../net/plugin';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { userId, channelId, permissions, group } = req.query;

  const { data, code, message, status } = await validateChannelPermissions({
    userId: userId as string,
    channelId: channelId as string,
    permissions: permissions as string,
    group: group as string,
  });

  res.status(status).json({
    data,
    code,
    message,
  });
}
