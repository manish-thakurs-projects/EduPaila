import { useSelector } from 'react-redux';

export default function ThemeProvider({ children }) {
  const { theme } = useSelector((state) => state.theme);
  return (
    <div className={theme}>
      <div
        className="min-h-screen 
        bg-[rgb(245,245,250)] 
        text-[rgb(50,50,50)] 
        dark:bg-[rgb(5,8,17)] 
        dark:text-[rgb(200,200,210)] 
        dark:border-[rgb(70,70,100)] 
        border-[rgb(210,210,220)] 
        border">
        {children}
      </div>
    </div>
  );
}
