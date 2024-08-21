import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function EditPostForm({ post, onClose, onUpdate }) {
  const [formData, setFormData] = useState(post);

  useEffect(() => {
    setFormData(post);
  }, [post]);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:5500/api/${post._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error ${response.status}: ${errorData.message || 'Failed to update post'}`);
      }
      
      const updatedPost = await response.json();
      onUpdate(updatedPost); // Notify parent to update the list
      onClose(); // Close the form
      console.log("id is : ",post._id)
    } catch (error) {
      console.log("id is : ",post._id)

      console.error('Error updating post:', error);
    }
  }
  

  return (
    <div className="modal show d-block" tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Post</h5>
            <button type="button" className="close" onClick={onClose}>&times;</button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="age">Age</label>
                <input type="number" className="form-control" id="age" name="age" value={formData.age} onChange={handleChange} required />
              </div>
              <button type="submit" className="btn btn-primary">Update</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

// Prop Types validation
EditPostForm.propTypes = {
  post: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
    age: PropTypes.number
  }).isRequired,
  onClose: PropTypes.func,
  onUpdate: PropTypes.func
};

export default EditPostForm;
