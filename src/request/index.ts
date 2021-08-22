import axios from 'axios';
import uiModule from 'mincu-ui';

let loadingInstant = () => {};

/**
 * 请求拦截
 */
axios.interceptors.request.use(async (config) => {
  const loading = await uiModule.loading('加载中', 0);
  loadingInstant = loading;
  return config;
});

/**
 * 相应拦截
 */
axios.interceptors.response.use(
  (response) => {
    loadingInstant();
    loadingInstant = () => {};
    return response;
  },
  () => {
    loadingInstant();
    loadingInstant = () => {};
  },
);

/**
 * 获取学号接口
 */
export const getXH = async (ksh: string, sfzh: string): Promise<ResOfXh> => {
  return new Promise((resolve, reject) => {
    axios({
      url: 'https://os.ncuos.com/api/register/token',
      method: 'post',
      data: {
        ksh,
        sfzh,
      },
    })
      .then(({ data }) => {
        resolve(data);
      })
      .catch((e) => {
        reject(e);
      });
  });
};

/**
 * 获取验证码
 */
export const getVerifyCodeReq = async (phone: string, token: string) => {
  return new Promise((resolve, reject) => {
    axios({
      url: 'https://os.ncuos.com/api/register',
      method: 'put',
      data: {
        phone_num: phone,
        token,
      },
    })
      .then(({ data }) => {
        resolve(data);
      })
      .catch((e) => {
        reject(e);
      });
  });
};

/**
 * 提交素所有信息
 */
export const completeRegister = async (options: ReqComplete) => {
  return new Promise((resolve, reject) => {
    axios({
      url: 'https://os.ncuos.com/api/register',
      method: 'post',
      data: options,
    })
      .then(({ data }) => {
        resolve(data);
      })
      .catch((e) => {
        reject(e);
      });
  });
};
