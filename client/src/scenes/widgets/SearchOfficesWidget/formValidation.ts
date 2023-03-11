export const formValidation = {
  cityName: {
    required: "Обов'язково",
    validate: (value: string) => {
      if (value.match(/^[А-ЩЬЮЯҐЄІЇа-щьюяґєії\s-.,]*$/)) {
        return true;
      }

      return 'Пошук здійснюється лише українськими літерами';
    },
  },
};
