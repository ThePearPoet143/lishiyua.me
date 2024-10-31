
import { AppThemeSwitcher } from "../theme"

const Footer = () => {
    return (
      <div className="flex w-full items-center justify-between border-border border-t pt-2">
        <div className="px-[2px] text-muted text-small">
          Built with next.js
        </div>
        <div className="text-muted text-small">
          <AppThemeSwitcher />
        </div>
      </div>
    );
  };
  
  export { Footer };