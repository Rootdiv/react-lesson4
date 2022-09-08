import { useState, useMemo } from 'react';
import style from './FunctionalComponent.module.css';

import PropTypes from 'prop-types';

export const FunctionalComponent = ({ min, max }) => {
  const [userNumber, setUserNumber] = useState('');
  const [result, setResult] = useState('Результат');
  const [count, setCount] = useState(0);
  // const [randomNumber, setRandomNumber] = useState(0);
  const [finish, setFinish] = useState(false);
  const [tempRandom, setTempRandom] = useState(0);

  const randomNumber = useMemo(() => {
    setFinish(false);
    return Math.floor(Math.random() * max - min) + min;
  }, [finish]);

  // useEffect(() => {
  //   setRandomNumber(Math.floor(Math.random() * max - min) + min);
  //   setFinish(false);
  // }, [finish]);

  // useLayoutEffect(() => {
  //   if (tempRandom >= 1) {
  //     setTempRandom(Math.random());
  //   }
  // }, [tempRandom]);

  const handleSubmit = event => {
    event.preventDefault();
    setCount(prevCount => prevCount + 1);
    if (tempRandom + 1 >= 1) {
      setTempRandom(Math.random());
    } else {
      setTempRandom(prev => prev + 1);
    }
    setResult(() => {
      if (!userNumber || userNumber < min || userNumber > max) {
        return `Введите число от ${min} до ${max}`;
      }
      if (userNumber > randomNumber) {
        return `${userNumber} больше загаданного`;
      }
      if (userNumber < randomNumber) {
        return `${userNumber} меньше загаданного`;
      }

      setFinish(true);
      return `Вы угадали, загаданное число ${userNumber}`;
    });
  };

  const handelChange = event => {
    setUserNumber(event.target.value);
  };

  return (
    <div className={style.game}>
      <p className={style.result}>{result}</p>
      <p className={style.result}>{tempRandom}</p>
      <form className={style.form} onSubmit={handleSubmit}>
        <label className={style.label} htmlFor="user_number">
          Попыток {count}
        </label>
        <input className={style.input} type="number" id="user_number" onChange={handelChange} value={userNumber} />
        <button className={style.btn}>Угадать</button>
      </form>
    </div>
  );
};

FunctionalComponent.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
};
