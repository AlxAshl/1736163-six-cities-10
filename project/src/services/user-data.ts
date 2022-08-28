const USER_MAIL = 'user-mail';

export const saveUser = (mail: string): void => {
  sessionStorage.setItem(USER_MAIL, mail);
};

export const getUser = (): string => {
  const mail = sessionStorage.getItem(USER_MAIL);
  return mail ?? '';
};
