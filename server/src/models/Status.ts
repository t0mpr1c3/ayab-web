export interface Status {
  statusCode: number;
  statusMessage: string;
};

export const error400: Status = {
  statusCode: 400,
  statusMessage: 'Bad request'
};

export const error401: Status = {
  statusCode: 401,
  statusMessage: 'Unauthorized'
};

export const error404: Status = {
  statusCode: 404,
  statusMessage: 'User not found'
};

export const error409: Status = {
  statusCode: 409,
  statusMessage: 'Username or email already in use'
};