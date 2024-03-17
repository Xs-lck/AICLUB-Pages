/*
 * @Description: 请补充模块描述
 *
 * @Author: liaoxiangsui
 * @Date: 2024-03-12 17:05:08
 *
 * Copyright © 2014-2024 Rabbitpre.com. All Rights Reserved.
 */
import { request } from '@/utils/request';
export const login = async () => {
  const body = {
    mobile: '17674063329',
    passwd: '7813068ba735f704b5ec9abc7ead4160',
  };
  const resp = await request.login(body);
  return resp;
};
