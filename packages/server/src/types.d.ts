type RequestData<T> = {
  body: T
}

type ResponseData<T> = {
  success: boolean;
  result: T;
} | Response

type ResponseS1HistoryPostResult = {
  success: boolean;
  message: string;
  data: {
    list: {
      authorid: number;
    }[];
  };
}
