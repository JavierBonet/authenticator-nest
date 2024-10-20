import React from 'react';
import Link from 'next/link';
import Image from 'next/image'; // If you're using Next.js' Image component for optimized images

// Define the component using TypeScript types
const NotFoundPage = () => {
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        {/* Display the image */}
        <Image
          src="/images/magicstudio-art.jpg"
          alt="Page not found"
          width={500}
          height={500}
          style={styles.image}
        />

        {/* Gentle message */}
        <h1 style={styles.title}>Oops! Page not found</h1>
        <p style={styles.description}>
          We can't seem to find the page you're looking for. But don't worry,
          you can return to the{' '}
          <Link href="/" style={styles.link}>
            home page
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

// Add some basic styles (inline or through a CSS file)
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    textAlign: 'center',
    padding: '0 20px',
    backgroundColor: '#f9f9f9',
  },
  content: {
    maxWidth: '600px',
  },
  image: {
    borderRadius: '10px',
    opacity: '0.8',
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    margin: '20px 0',
  },
  description: {
    fontSize: '1.2rem',
    color: '#555',
  },
  link: {
    color: '#0070f3',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
};

export default NotFoundPage;
