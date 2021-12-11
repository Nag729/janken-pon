import { useRouter } from "next/router";
import styles from "../../styles/Home.module.css";

const Room = () => {
  const router = useRouter();
  const { roomId, name } = router.query;

  return (
    <section className={styles.container}>
      <main className={styles.main}>
        <p>roomId: {roomId}</p>
        <p>name: {name}</p>
      </main>
    </section>
  );
};

export default Room;
