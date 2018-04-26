import Cookie from 'js-cookie';

const setCookie = ({ name, value }) => {
  if (!process.browser) {
    return;
  }
  Cookie.set(name, value);
}

const getServerCookie = ({ name, req }) => {
  if (!req.headers.cookie) {
    return;
  }

  const cookie = req.headers.cookie.split(';').find(c => c.trim().startsWith(`${name}=`))

  if (!cookie) {
    return;
  }

  return cookie.split('=')[1];
}

const getLocalCookie = ({ name }) => {
  return Cookie.getJSON(name);
}

const getCookie = ({ name, req }) => {
  if (!process.browser) {
    return getServerCookie({ name, req });
  }

  return getLocalCookie({ name });
}


export {
  setCookie,
  getCookie,
}