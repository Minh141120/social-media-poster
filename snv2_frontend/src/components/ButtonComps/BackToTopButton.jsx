import React from 'react';

const BackToTopButton = () => {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <button 
            style={{
                position: 'fixed',
                bottom: '20px',
                right: '20px',
                zIndex: 1000,
                width: '30px',           // Điều chỉnh kích thước nút
                height: '30px',          // Điều chỉnh kích thước nút
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '50%',      // Làm cho nút hình tròn
                opacity: 0.5,             // Đặt độ trong suốt
                cursor: 'pointer',
                display: 'flex',          // Đặt flex để căn giữa nội dung
                alignItems: 'center',     // Căn giữa theo chiều dọc
                justifyContent: 'center'  // Căn giữa theo chiều ngang
            }}
            onClick={scrollToTop}
        >
            ▲
        </button>
    );
};

export default BackToTopButton;
