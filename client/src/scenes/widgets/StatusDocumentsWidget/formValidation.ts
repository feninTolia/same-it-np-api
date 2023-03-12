export const formValidation = {
  required: "Обов'язково",
  validate: (value: string) => {
    if (value.match(/^[0-9]*$/)) {
      return true;
    }
    return 'Номер не може містити літери';
  },
};
