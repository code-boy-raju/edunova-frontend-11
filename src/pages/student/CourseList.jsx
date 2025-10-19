import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCourses } from '../../redux/actions/courseActions';
import { Row, Col, Form, InputGroup, Alert } from 'react-bootstrap';
import CourseCard from '../../components/CourseCard';
import LoadingSpinner from '../../components/LoadingSpinner';
import EmptyState from '../../components/EmptyState';

function CourseList() {
  const dispatch = useDispatch();
  const { courses, loading, error } = useSelector(state => state.courses);
  const { user } = useSelector(state => state.auth);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !categoryFilter || course.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const categories = [...new Set(courses.map(c => c.category).filter(Boolean))];
  const basePath = user?.role === 'student' ? '/student-dashboard' : '';

  if (loading) return <LoadingSpinner message="Loading courses..." />;

  if (error) {
    return (
      <Alert variant="danger">
        <Alert.Heading>Error Loading Courses</Alert.Heading>
        <p>{error}</p>
      </Alert>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Available Courses</h2>
        <span className="text-muted">{filteredCourses.length} courses found</span>
      </div>

      {/* Search & Filter */}
      <Row className="mb-4">
        <Col md={8}>
          <InputGroup>
            <InputGroup.Text>🔍</InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Search courses by title or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
        </Col>
        <Col md={4}>
          <Form.Select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </Form.Select>
        </Col>
      </Row>

      {/* Course Grid */}
      {filteredCourses.length === 0 ? (
        <EmptyState
          icon="🔍"
          title="No courses found"
          message={searchTerm || categoryFilter 
            ? "Try adjusting your search or filters" 
            : "No courses available yet"}
        />
      ) : (
        <Row xs={1} md={2} lg={3} className="g-4">
          {filteredCourses.map(course => (
            <Col key={course._id}>
              <CourseCard course={course} basePath={basePath} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}

export default CourseList;
