import styles from "./SubpageButton.module.scss";

interface SubpageButtonProps {
    text: string,
    image: string,
    url: string,
}

const SubpageButton: React.FC<SubpageButtonProps> = ({ text, image, url }) => {
    return (
    <div className={styles.mainContainer}>
      <h3>{text}</h3>
      <h3>{image}</h3>
      <h3>{url}</h3>
    </div>
  );
};

export default SubpageButton;