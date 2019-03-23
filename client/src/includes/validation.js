export const required = value => {
  if (!value || value === undefined) {
    return 'This field can not be empty';
  }

  return;
};
