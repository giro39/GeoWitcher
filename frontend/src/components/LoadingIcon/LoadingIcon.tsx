import styles from './LoadingIcon.module.scss';

const LoadingIcon = () => (
  <div className={styles.loaderWrapper}>
    <div className={styles.loader}></div>
  </div>
);

export default LoadingIcon;