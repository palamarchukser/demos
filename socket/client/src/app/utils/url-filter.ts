export function urlFilter(string: string) {
  const urlReg = /(https?:\/\/[^\s]+)/g;

  return string.replace(urlReg, url => `<a href="${url}" target="_blank">${url}</a>`);
}
