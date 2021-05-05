function moduloHelper(data: any[], limit: number, index: number) {
  return data.filter((item, position) => position % limit === index);
}

export default  moduloHelper;
