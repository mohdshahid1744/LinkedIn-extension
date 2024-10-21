import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import Modal from '../Modal';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';

function ContentScript() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false); 
  const [isIconClicked, setIsIconClicked] = useState(false);
  const aiIconRef = useRef<HTMLDivElement | null>(null); 

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleGenerate = (): string => {
    return 'Thank you for the opportunity! Feel free to ask more questions.';
  };

  const handleMouseDown = (event: React.MouseEvent) => {
    if (aiIconRef.current && aiIconRef.current.contains(event.target as Node)) {
      event.preventDefault();
      setIsIconClicked(true); 
    }
  };

  useEffect(() => {
    const observer = new MutationObserver((mutationsList) => {
      mutationsList.forEach(() => {
        const chatInput = document.querySelector('.msg-form__contenteditable');

        if (chatInput && !document.querySelector('.auto-fix-high-icon')) {
          const iconContainer = document.createElement('div');
          iconContainer.className = 'fixed-icon-container auto-fix-high-icon';
          iconContainer.style.position = 'absolute';
          iconContainer.style.right = '10px';
          iconContainer.style.top = '50%';
          iconContainer.style.transform = 'translateY(-50%)';
          iconContainer.style.display = isFocused ? 'block' : 'none'; 

          chatInput.parentElement?.appendChild(iconContainer);
          const root = document.createElement('div');
          iconContainer.appendChild(root);
          const reactRoot = createRoot(root);
          reactRoot.render(
            <div
              className="cursor-pointer"
              ref={aiIconRef} 
              onMouseDown={handleMouseDown}
              onClick={(event) => {
                event.stopPropagation();
                handleOpenModal();
              }}
            >
              <AutoFixHighIcon fontSize="large" />
            </div>
          );

          const showIcon = () => {
            iconContainer.style.display = 'block'; 
            setIsFocused(true);  
          };

          const hideIcon = () => {
            setTimeout(() => {
              if (!isModalOpen && !isIconClicked) {
                iconContainer.style.display = 'none'; 
                setIsFocused(false); 
              }
              setIsIconClicked(false); 
            }, 100); 
          };

          chatInput.addEventListener('focus', showIcon);
          chatInput.addEventListener('blur', hideIcon);

          return () => {
            chatInput.removeEventListener('focus', showIcon);
            chatInput.removeEventListener('blur', hideIcon);
            chatInput.parentElement?.removeChild(iconContainer);
          };
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, [isModalOpen, isIconClicked]);

  return (
    <>
      {isModalOpen && (
        <Modal
          open={isModalOpen}
          onClose={handleCloseModal}
          title="Generate Prompt"
          onGenerate={handleGenerate}
        />
      )}
    </>
  );
}

export default ContentScript;
