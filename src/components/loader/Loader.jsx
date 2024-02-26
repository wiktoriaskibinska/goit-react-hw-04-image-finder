import React from 'react';
import { Hearts } from 'react-loader-spinner';
import css from './Loader.module.css';
const Loader = () => {
  return (
    <div className={css.loaderWrapper}>
      <Hearts
        visible={true}
        height="80"
        width="80"
        color="#86c5da"
        ariaLabel="hearts-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default Loader;
