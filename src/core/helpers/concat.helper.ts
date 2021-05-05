function concatHelper(...parts: string[]) {
  return parts.slice(0, -1).join('');
}

export default concatHelper;
