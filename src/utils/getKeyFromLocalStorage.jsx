import React from 'react';

export const getKeyFromLocalStorage = () => {
    let key = null;
    if (localStorage.getItem("key")) {
      key = localStorage.getItem("key");
    }
    return key
};