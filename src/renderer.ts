import './index.css';

interface KeyboardData {
  layouts: {
    [layoutName: string]: {
      layout: Array<{
        label: string;
        x: number;
        y: number;
        w?: number;
        h?: number;
      }>;
    };
  };
}

const UNIT_SIZE = 60;

async function loadAndDisplayKeymap() {
  try {
    const keyboardData = await (window as any).electron.loadKeyboardData() as KeyboardData;
    const layoutSelector = document.getElementById('layout-selector') as HTMLSelectElement;
    const container = document.getElementById('keymap-container');

    if (!container || !layoutSelector) {
      console.error('Required elements not found');
      return;
    }

    // Populate layout selector
    for (const layoutName in keyboardData.layouts) {
      const option = document.createElement('option');
      option.value = layoutName;
      option.textContent = layoutName;
      layoutSelector.appendChild(option);
    }

    function renderLayout(layoutName: string) {
      container.innerHTML = '';
      const layout = keyboardData.layouts[layoutName].layout;

      layout.forEach(key => {
        const keyElement = document.createElement('div');
        keyElement.className = 'key';
        keyElement.textContent = key.label;
        keyElement.style.left = `${key.x * UNIT_SIZE}px`;
        keyElement.style.top = `${key.y * UNIT_SIZE}px`;
        keyElement.style.width = `${(key.w || 1) * UNIT_SIZE - 2}px`;
        keyElement.style.height = `${(key.h || 1) * UNIT_SIZE - 2}px`;
        container.appendChild(keyElement);
      });
    }

    layoutSelector.addEventListener('change', (e) => {
      renderLayout((e.target as HTMLSelectElement).value);
    });

    // Initial render
    renderLayout(layoutSelector.value);
  } catch (error) {
    console.error('Error loading keymap:', error);
  }
}

loadAndDisplayKeymap();