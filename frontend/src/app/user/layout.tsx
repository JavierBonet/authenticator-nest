'use client';
import React, { useEffect, useContext, useState } from 'react';
import TokenContext from '../../contexts/TokenContext';
import {
  Keys,
  deleteLocalStorageKey,
  getLocalStorageKey,
  setLocalStorageKey,
} from '../../app/authentication/common/utils/localStorage';
import AuthenticationApi from '../../api/authenticationApi';

interface Props {
  children: React.ReactNode;
}

export default function ProtectedLayout({ children }: Props) {
  const [signedUp, setSignedUp] = useState<boolean | undefined>(undefined);
  const { token, setToken, tokenRef } = useContext(TokenContext);

  const authenticationApi = new AuthenticationApi(
    setToken,
    () => tokenRef.current
  );

  const refresh = async () => {
    const notRefreshing = getLocalStorageKey(Keys.RefreshingToken) !== 'true';
    if (!token && notRefreshing) {
      setLocalStorageKey(Keys.RefreshingToken, 'true');
      await authenticationApi
        .refreshAccessToken()
        .then(() => {
          console.log('Refreshed access token');
        })
        .catch((error) => {
          console.log('--', error);
        })
        .finally(() => deleteLocalStorageKey(Keys.RefreshingToken));
    }
  };

  useEffect(() => {
    setSignedUp(getLocalStorageKey(Keys.SignedIn) === 'true');
    const refreshToken = async () => {
      await refresh();
    };
    refreshToken();
  }, []);

  return signedUp ? children : <></>;
}
