import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';
import { getStudent, updateStudent } from '../utils/api';

const EditStudent = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '',
    course: '', year: '', cgpa: ''
  });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    fetchStudent();
  }, []);

  const fetchStudent = async () => {
    try {
      const res = await getStudent(id);
      setFormData(res.data);
    } catch (error) {
      toast.error('Failed to fetch student details');
    } finally {
      setFetching(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateStudent(id, formData);
      toast.success('Student updated successfully!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update student');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div style={styles.container}>
        <Navbar />
        <p style={styles.loading}>Loading student details...</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <Navbar />
      <div style={styles.content}>
        <div style={styles.card}>
          <h2 style={styles.title}>Edit Student ✏️</h2>
          <form onSubmit={handleSubmit}>
            <div style={styles.grid}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  style={styles.input}
                  placeholder="Enter student name"
                  required
                />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  style={styles.input}
                  placeholder="Enter student email"
                  required
                />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  style={styles.input}
                  placeholder="Enter phone number"
                  required
                />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Course</label>
                <input
                  type="text"
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  style={styles.input}
                  placeholder="e.g. B.E. Computer Science"
                  required
                />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Year</label>
                <select
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  style={styles.input}
                  required
                >
                  <option value="">Select Year</option>
                  <option value="1">1st Year</option>
                  <option value="2">2nd Year</option>
                  <option value="3">3rd Year</option>
                  <option value="4">4th Year</option>
                </select>
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>CGPA</label>
                <input
                  type="number"
                  name="cgpa"
                  value={formData.cgpa}
                  onChange={handleChange}
                  style={styles.input}
                  placeholder="e.g. 8.5"
                  min="0"
                  max="10"
                  step="0.01"
                  required
                />
              </div>
            </div>
            <div style={styles.buttons}>
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                style={styles.cancelBtn}
              >
                Cancel
              </button>
              <button
                type="submit"
                style={styles.submitBtn}
                disabled={loading}
              >
                {loading ? 'Updating...' : 'Update Student'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    background: '#f0f4f8',
  },
  content: {
    padding: '30px',
    maxWidth: '800px',
    margin: '0 auto',
  },
  card: {
    background: '#fff',
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
  },
  title: {
    color: '#1a3a5c',
    fontSize: '24px',
    marginBottom: '25px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '20px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    marginBottom: '6px',
    color: '#444',
    fontSize: '14px',
    fontWeight: '600',
  },
  input: {
    padding: '10px 14px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    fontSize: '14px',
    outline: 'none',
    boxSizing: 'border-box',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
    marginTop: '25px',
  },
  cancelBtn: {
    padding: '12px 24px',
    background: '#f0f4f8',
    color: '#444',
    border: '1px solid #ddd',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  submitBtn: {
    padding: '12px 24px',
    background: 'linear-gradient(135deg, #1a3a5c 0%, #2d6a9f 100%)',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  loading: {
    textAlign: 'center',
    marginTop: '40px',
    color: '#666',
  },
};

export default EditStudent;