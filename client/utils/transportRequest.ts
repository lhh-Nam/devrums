const handleResponse = (
  response: Response,
  method: string,
  isFileResponse?: boolean
) => {
  if (!response.ok) {
  }

  if (!isFileResponse) {
    return response;
  } else {
    return response.json();
  }
};

// export const postRequestAsync = async <TRequest, TResponse>(
//     apiUrl: string,
//     data: TRequest,
//     method:string
//     isAnonymous?: boolean
//   ):Promise<TResponse> => {
//     let  token = "";

//   };

export const getAsync = async <TResponse>(
  apiUrl: string,
  isAnonymous?: boolean
): Promise<TResponse> => {
  if (isAnonymous) {
    const response = await fetch(apiUrl);
    return handleResponse(response, "GET");
  } else {
    const response = await fetch(apiUrl, {
      headers: {
        Authorization: `Bearer `,
        "Content-Type": "application/json",
      },
    });
    return handleResponse(response, "GET");
  }
};

export const postAsync = async <TRequest, TResponse>(
  apiUrl: string,
  data: TRequest,
  isAnonymous?: boolean
) => {};
