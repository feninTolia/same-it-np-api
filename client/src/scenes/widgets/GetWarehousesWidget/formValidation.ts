const REQUIRED_FIELD = "Обов'язково";

export const cityNameValidation = {
  required: REQUIRED_FIELD,
  validate: (value: string) => {
    if (value?.match(/^[А-ЩЬЮЯҐЄІЇа-щьюяґєії\s-.,]*$/)) {
      return true;
    }

    return 'Пошук здійснюється лише українськими літерами';
  },
};

export const warehouseNumberValidation = {
  validate: (value: string) => {
    if (value?.match(/^[0-9]*$/)) {
      return true;
    }

    return 'Тільки цифри';
  },
};
