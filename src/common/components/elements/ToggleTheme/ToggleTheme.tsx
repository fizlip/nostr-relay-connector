import { useState, useEffect } from 'react' 

const ThemeToggle = () => {
  const [activeTheme, setActiveTheme] = useState("dark");
  const [theme, setTheme] = useState(true)

  useEffect(() => {
    if (localStorage.getItem('color-theme')) {
      if (localStorage.getItem('color-theme') === 'light') {
        // Is light theme
        setActiveTheme("🌙")
        document.body.dataset.theme = "light";
      }
      else{
        // is dark theme
        setActiveTheme("☀️")
        document.body.dataset.theme = "dark";
      }
    }
    else{
      if (document.documentElement.classList.contains('dark')) {
        // Is dark theme
        setActiveTheme("☀️")
        document.body.dataset.theme = "dark";
      }
      else{
        // Is light theme
        setActiveTheme("🌙")
        document.body.dataset.theme = "light";
      }
    }
  },[theme])

  const toggle = () => {
    if (localStorage.getItem('color-theme')) {
      if (localStorage.getItem('color-theme') === 'light') {
        document.documentElement.classList.add('dark');
        localStorage.setItem('color-theme', 'dark');
      } 
      else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('color-theme', 'light');
      }
    } 
    else {
      if (document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('color-theme', 'light');
      } 
      else {
        document.documentElement.classList.add('dark');
        localStorage.setItem('color-theme', 'dark');
      }
    }
    setTheme(p => !p)
  }

  return (
    <button className="transition-all border rounded-full mt-5 p-2 pl-3 pr-3 hover:bg-zinc-100 dark:border-zinc-800 dark:hover:bg-zinc-800" onClick={() => toggle()}>
      {
        activeTheme
      }
    </button>
  );
};

export default ThemeToggle;
