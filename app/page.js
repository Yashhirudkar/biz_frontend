import React from 'react'

const page = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Admin Dashboard</h1>
      <p>This is the main content area. Only this area should scroll when there is overflow content.</p>
      
      {/* Add enough content to demonstrate scrolling */}
      {[...Array(50)].map((_, i) => (
        <div key={i} style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ddd' }}>
          <h2>Section {i + 1}</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      ))}
    </div>
  )
}

export default page
