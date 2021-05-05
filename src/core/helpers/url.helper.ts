const { APP_URL } = process.env;

function urlHelper(path: string) {
  if (path.startsWith('/')) {
    return `${APP_URL}${path}`;
  }
  return `${APP_URL}/${path}`;
}

export default urlHelper;
