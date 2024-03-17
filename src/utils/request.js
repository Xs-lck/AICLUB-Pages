/*
 * @Description: 请补充模块描述
 *
 * @Author: liaoxiangsui
 * @Date: 2024-03-10 10:24:27
 *
 * Copyright © 2014-2024 Rabbitpre.com. All Rights Reserved.
 */
import axios from 'axios';
import { test_base_url } from '@/configs/testApiConfig';

class Request {
  instance;
  static Authorization = '';
  constructor(url) {
    this.instance = axios.create({
      baseURL: url,
      timeout: 30000,
      timeoutErrorMessage: 'Time out!',
    });

    // 返回拦截
    this.instance.interceptors.response.use(
      (response) => {
        if (response.headers.Authorization) {
          Request.Authorization = response.headers.Authorization;
        }
        return response.data;
      },
      (error) => {
        console.log(error);
      }
    );

    // 请求拦截
    this.instance.interceptors.request.use(
      (request) => {
        if (Request.Authorization) {
          request.headers.Authorization = Request.Authorization;
        }
        return request;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  post = async (...rest) => {
    try {
      return this.instance.post.call(null, ...rest);
    } catch (error) {}
  };

  get = async (...rest) => {
    try {
      return this.instance.get.call(null, ...rest);
    } catch (error) {}
  };

  login = async ({ mobile, passwd }) => {
    const loginData = await this.post('/api/user/login', {
      mobile,
      passwd,
    });
    return loginData;
  };
}

export default Request;
export const request = new Request(test_base_url);
