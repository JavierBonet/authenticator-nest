import React from 'react';
import { Tooltip } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Link from 'next/link';
import styles from './NavBarLayout.module.scss';

export default function WelcomeLayout() {
  return (
    <div className={styles['home-links']}>
      <Tooltip title="Login">
        <Link href="/signin">
          <div className={styles['home-link']}>
            Login
            <LoginIcon fontSize="large" />
          </div>
        </Link>
      </Tooltip>
      |
      <Tooltip title="Register">
        <Link href="/signup">
          <div className={styles['home-link']}>
            Register <PersonAddIcon fontSize="large" />
          </div>
        </Link>
      </Tooltip>
    </div>
  );
}
