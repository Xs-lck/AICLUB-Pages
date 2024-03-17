/*
 * @Description: 请补充模块描述
 *
 * @Author: liaoxiangsui
 * @Date: 2024-03-17 18:32:36
 *
 * Copyright © 2014-2024 Rabbitpre.com. All Rights Reserved.
 */
import { request } from '@/utils/request';

export const getSessionHistory = async (session_id) => {
  const resp = await request.get(`/api/ai/session/${session_id}/history`);
  return resp.data.list;
};
