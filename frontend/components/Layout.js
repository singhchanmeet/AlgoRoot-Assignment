import Head from 'next/head';
import styles from '../styles/Layout.module.css';

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Task Management App</title>
        <meta name="description" content="A simple task management application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <header className={styles.header}>
        <div className={styles.container}>
          <h1 className={styles.title}>Task Management</h1>
        </div>
      </header>
      
      <main className={styles.main}>
        <div className={styles.container}>
          {children}
        </div>
      </main>
      
      <footer className={styles.footer}>
        <div className={styles.container}>
          <p>&copy; {new Date().getFullYear()} Task Management App</p>
        </div>
      </footer>
    </>
  );
}