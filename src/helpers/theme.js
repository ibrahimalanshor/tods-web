export default () => {
  const savedTheme = localStorage.getItem('theme');
  const dark = localStorage.hasOwnProperty('theme')
    ? savedTheme === 'dark' || savedTheme === null
    : window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (dark) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
};
