import React from 'react'

const Footer = () => {
  return (
    <footer style={footerStyle}>
        <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
    </footer>

  )
}

const footerStyle = {
    width: '100%',
    backgroundColor: '#333',
    color: 'white',
    textAlign: 'center',
    padding: '10px 0',
    position:"fixed",
    bottom:'0px',
};

export default Footer