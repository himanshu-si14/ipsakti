import Sidebar from './Sidebar';
import Topbar from './Topbar';
import SahayakOrbButton from './SahayakOrbButton';

export default function Layout({ children, title, breadcrumb }) {
  return (
    <div className="app-shell">
      <Sidebar />
      <div className="main-content">
        <Topbar title={title} breadcrumb={breadcrumb} />
        {children}
      </div>
      <SahayakOrbButton />
    </div>
  );
}

