import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';
import { getStudents, deleteStudent } from '../utils/api';

const Dashboard = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await getStudents();
      setStudents(res.data);
    } catch (error) {
      toast.error('Failed to fetch students');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await deleteStudent(id);
        toast.success('Student deleted successfully!');
        fetchStudents();
      } catch (error) {
        toast.error('Failed to delete student');
      }
    }
  };

  const filteredStudents = students.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.course.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={styles.container}>
      <Navbar />
      <div style={styles.content}>
        {/* Header */}
        <div style={styles.header}>
          <div>
            <h1 style={styles.title}>Student Records</h1>
            <p style={styles.subtitle}>
              Total Students: <strong>{students.length}</strong>
            </p>
          </div>
          <button
            onClick={() => navigate('/add-student')}
            style={styles.addBtn}
          >
            + Add Student
          </button>
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="🔍 Search by name or course..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.search}
        />

        {/* Table */}
        {loading ? (
          <p style={styles.loading}>Loading students...</p>
        ) : filteredStudents.length === 0 ? (
          <div style={styles.empty}>
            <p>No students found.</p>
            <button
              onClick={() => navigate('/add-student')}
              style={styles.addBtn}
            >
              + Add First Student
            </button>
          </div>
        ) : (
          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead>
                <tr style={styles.tableHead}>
                  <th style={styles.th}>#</th>
                  <th style={styles.th}>Name</th>
                  <th style={styles.th}>Email</th>
                  <th style={styles.th}>Phone</th>
                  <th style={styles.th}>Course</th>
                  <th style={styles.th}>Year</th>
                  <th style={styles.th}>CGPA</th>
                  <th style={styles.th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student, index) => (
                  <tr key={student._id} style={styles.tableRow}>
                    <td style={styles.td}>{index + 1}</td>
                    <td style={styles.td}>{student.name}</td>
                    <td style={styles.td}>{student.email}</td>
                    <td style={styles.td}>{student.phone}</td>
                    <td style={styles.td}>{student.course}</td>
                    <td style={styles.td}>{student.year}</td>
                    <td style={styles.td}>{student.cgpa}</td>
                    <td style={styles.td}>
                      <button
                        onClick={() =>
                          navigate(`/edit-student/${student._id}`)
                        }
                        style={styles.editBtn}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(student._id)}
                        style={styles.deleteBtn}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
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
    maxWidth: '1200px',
    margin: '0 auto',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  title: {
    color: '#1a3a5c',
    fontSize: '28px',
    marginBottom: '4px',
  },
  subtitle: {
    color: '#666',
    fontSize: '14px',
  },
  addBtn: {
    background: 'linear-gradient(135deg, #1a3a5c 0%, #2d6a9f 100%)',
    color: '#fff',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  search: {
    width: '100%',
    padding: '12px 16px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    fontSize: '14px',
    marginBottom: '20px',
    boxSizing: 'border-box',
    outline: 'none',
  },
  tableWrapper: {
    overflowX: 'auto',
    borderRadius: '12px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    background: '#fff',
    borderRadius: '12px',
    overflow: 'hidden',
  },
  tableHead: {
    background: 'linear-gradient(135deg, #1a3a5c 0%, #2d6a9f 100%)',
  },
  th: {
    padding: '14px 16px',
    color: '#fff',
    textAlign: 'left',
    fontSize: '13px',
    fontWeight: '600',
  },
  tableRow: {
    borderBottom: '1px solid #f0f0f0',
  },
  td: {
    padding: '12px 16px',
    fontSize: '13px',
    color: '#444',
  },
  editBtn: {
    background: '#2d6a9f',
    color: '#fff',
    border: 'none',
    padding: '6px 12px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '12px',
    marginRight: '6px',
  },
  deleteBtn: {
    background: '#e74c3c',
    color: '#fff',
    border: 'none',
    padding: '6px 12px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '12px',
  },
  loading: {
    textAlign: 'center',
    color: '#666',
    fontSize: '16px',
    marginTop: '40px',
  },
  empty: {
    textAlign: 'center',
    color: '#666',
    fontSize: '16px',
    marginTop: '40px',
  },
};

export default Dashboard;