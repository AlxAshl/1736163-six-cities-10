const USER_MAIL = 'user-mail';

export const saveUser = (mail: string): void => {
  localStorage.setItem(USER_MAIL, mail);
};

export const getUser = (): string => {
  const mail = localStorage.getItem(USER_MAIL);
  return mail ?? '';
};
