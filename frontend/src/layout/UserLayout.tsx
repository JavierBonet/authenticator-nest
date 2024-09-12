'use client';

import React, { useContext, useState } from 'react';
import { Tooltip } from '@mui/material';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import MovieIcon from '@mui/icons-material/Movie';
import CodeIcon from '@mui/icons-material/Code';
import LogoutIcon from '@mui/icons-material/Logout';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import TokenContext from '../contexts/TokenContext';
import AuthenticationApi from '../api/authenticationApi';
import { toast } from 'react-toastify';
import LogoutDialog from './UserLayout/Dialog';
import styles from './NavBarLayout.module.scss';

export default function UserLayout() {
  const [open, setOpen] = useState(false);
  const { setToken, tokenRef } = useContext(TokenContext);
  const router = useRouter();
  const authenticationApi = new AuthenticationApi(
    setToken,
    () => tokenRef.current
  );

  const handleLogout = () => {
    authenticationApi.logout().then(({ message }) => {
      setToken('');
      setOpen(false);
      router.push('/signin');
      toast.success(message);
    });
  };

  return (
    <>
      <div className={styles['navbar-links']}>
        <Tooltip title="Products">
          <Link href="/user/products">
            <div className={styles['navbar-link']}>
              Products
              <HomeRepairServiceIcon fontSize="large" />
            </div>
          </Link>
        </Tooltip>
        |
        <Tooltip title="Movies">
          <Link href="/user/movies">
            <div className={styles['navbar-link']}>
              Movies
              <MovieIcon fontSize="large" />
            </div>
          </Link>
        </Tooltip>
        |
        <Tooltip title="Development">
          <Link href="/user/programming-languages">
            <div className={styles['navbar-link']}>
              Development
              <CodeIcon fontSize="large" />
            </div>
          </Link>
        </Tooltip>
        |
        <Tooltip title="Log out">
          <Link href="#">
            <div
              className={styles['navbar-link']}
              onClick={() => setOpen(true)}
            >
              Log out <LogoutIcon fontSize="large" />
            </div>
          </Link>
        </Tooltip>
      </div>
      <LogoutDialog open={open} setOpen={setOpen} onClick={handleLogout} />
    </>
  );
}
