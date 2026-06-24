import Sidebar from './Sidebar';
import { useTheme } from '../../context/ThemeContext';

const AppLayout = ({ children }) => {
  const { isDark } = useTheme();

  return (
    <div className={`flex h-screen overflow-hidden ${isDark ? 'bg-[#0f1117]' : 'bg-[#f4f5f7]'}`}>
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default AppLayout;