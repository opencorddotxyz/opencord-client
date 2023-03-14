import { NextApiRequest, NextApiResponse } from 'next';
import { validateServerPermissions } from '../../net/plugin';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { userId, serverId, permissions, group } = req.query;

  const { data, code, message, status } = await validateServerPermissions({
    userId: userId as string,
    serverId: serverId as string,
    permissions: permissions as string,
    group: group as string,
  });

  res.status(status).json({
    data,
    code,
    message,
  });
}
