import { m as readTask, f as writeTask } from './index-e5ff2de3.js';

const startStatusTap = () => {
    const win = window;
    win.addEventListener('statusTap', () => {
        readTask(() => {
            const width = win.innerWidth;
            const height = win.innerHeight;
            const el = document.elementFromPoint(width / 2, height / 2);
            if (!el) {
                return;
            }
            const contentEl = el.closest('ion-content');
            if (contentEl) {
                contentEl.componentOnReady().then(() => {
                    writeTask(() => contentEl.scrollToTop(300));
                });
            }
        });
    });
};

export { startStatusTap };
