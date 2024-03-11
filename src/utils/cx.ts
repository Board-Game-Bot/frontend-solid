export const cx = (...className: (string | false | undefined)[]) => {
  return className.filter(x => x).join(' ');
};