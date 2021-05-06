function i18nHelper(key: string, context: any) {
  return context.data.root.t(key);
}

export default i18nHelper;
