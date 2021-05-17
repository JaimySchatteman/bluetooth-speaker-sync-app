type Token = {
  data: tokenData;
  expires: Date | string;
};

type tokenData = {
  token: string;
};

export default Token;
