export const AppError = {
  INIT_ERROR: {
    code: -32001,
    message: 'Opencord initialization failed',
  },
  NOT_IN_OPENCORD: {
    code: -32002,
    message: 'Not in opencord',
  },
  RUNTIME_ERROR: {
    code: -32003,
    message: 'An error occurred while the program was running',
  },
};

export const VersionError = {
  CLIENT_VERSION_LOWER: {
    code: -32011,
    message: 'The client version is too low',
  },
  SDK_VERSION_LOWER: {
    code: -32012,
    message: 'The sdk version is too low',
  },
};
