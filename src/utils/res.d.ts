interface ResOfXh {
  status: number;
  message: string;
  data: { xh: number; name: string; token?: string };
}

interface ResOfVerifyCode {
  status: number;
  message: string;
}

interface ReqComplete {
  verify_code: string;
  phone_num: string;
  password: string;
  token: string;
  qq: string;
}
