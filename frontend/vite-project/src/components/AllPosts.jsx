import { useState, useEffect } from 'react';
import EditPostForm from './EditPostForm'; // Import the EditPostForm component

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingPost, setEditingPost] = useState(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch('http://localhost:5500/');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  async function handleDelete(id) {
    try {
      const response = await fetch(`http://localhost:5500/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete post');
      }
      setPosts(posts.filter(post => post._id !== id));
    } catch (error) {
      setError(error.message);
    }
  }

  function handleUpdate(updatedPost) {
    setPosts(posts.map(post => (post._id === updatedPost._id ? updatedPost : post)));
  }

  function handleEdit(post) {
    setEditingPost(post);
  }

  function handleCloseEditForm() {
    setEditingPost(null);
  }

  if (loading) {
    return <div className="container mt-5 text-center">Loading...</div>;
  }

  if (error) {
    return <div className="container mt-5 text-center alert alert-danger">{error}</div>;
  }

  if (posts.length === 0) {
    return <div className="container mt-5 text-center">No posts available</div>;
  }

  return (
    <div className="container mt-5">
      <div className="row">
        {posts.map(post => (
          <div className="col-md-4 mb-4" key={post._id}>
            <div className="card">
              <div className="card-header bg-primary text-white">
                <h5 className="card-title mb-0">{post.title}</h5>
              </div>
              <div className="card-body">
                <p className="card-text"><strong>Name:</strong> {post.name}</p>
                <p className="card-text"><strong>Email:</strong> {post.email}</p>
                <p className="card-text"><strong>Age:</strong> {post.age}</p>
              </div>
              <div className="card-footer text-center">
                <button className="btn btn-warning me-2" onClick={() => handleEdit(post)}>Edit</button>
                <button className="btn btn-danger" onClick={() => handleDelete(post._id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {editingPost && (
        <EditPostForm
          post={editingPost}
          onClose={handleCloseEditForm}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
}

export default AllPosts;
